#!/bin/bash

# Script di deployment automatico per Lambda Functions
# Usage: ./deploy.sh [create|update]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
AWS_REGION="us-east-1"  # Default region, can be overridden by .env
LAMBDA_RUNTIME="nodejs18.x"
LAMBDA_TIMEOUT=30

# AWS Profile support
# Set AWS_PROFILE environment variable to use a specific profile
# Example: AWS_PROFILE=pinaddict ./deploy.sh
if [ ! -z "$AWS_PROFILE" ]; then
    PROFILE_FLAG="--profile $AWS_PROFILE"
    echo -e "${GREEN}🚀 Pin Addict - Lambda Deployment Script${NC}"
    echo -e "${YELLOW}📌 Using AWS Profile: ${AWS_PROFILE}${NC}\n"
else
    PROFILE_FLAG=""
    echo -e "${GREEN}🚀 Pin Addict - Lambda Deployment Script${NC}\n"
fi

PROFILE_FLAG="--profile personal"
# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI not found. Install it first:${NC}"
    echo "   curl \"https://awscli.amazonaws.com/AWSCLIV2.pkg\" -o \"AWSCLIV2.pkg\""
    echo "   sudo installer -pkg AWSCLIV2.pkg -target /"
    exit 1
fi

# Check if AWS is configured
if ! aws sts get-caller-identity --profile personal &> /dev/null; then
    echo -e "${RED}❌ AWS CLI not configured.${NC}"
    if [ ! -z "$AWS_PROFILE" ]; then
        echo -e "${RED}Profile '${AWS_PROFILE}' not found. Run: aws configure --profile ${AWS_PROFILE}${NC}"
    else
        echo -e "${RED}Run: aws configure${NC}"
        echo -e "${YELLOW}Or use a profile: AWS_PROFILE=pinaddict ./deploy.sh${NC}"
    fi
    exit 1
fi

# Get AWS Account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --profile personal --query Account --output text)
echo -e "📋 AWS Account: ${YELLOW}${AWS_ACCOUNT_ID}${NC}"
echo -e "📍 Region: ${YELLOW}${AWS_REGION}${NC}\n"

# Function to check if Lambda exists
lambda_exists() {
    aws lambda get-function --function-name $1 --region $AWS_REGION $PROFILE_FLAG &> /dev/null
    return $?
}

# Function to create or update Lambda
deploy_lambda() {
    local FUNCTION_NAME=$1
    local DESCRIPTION=$2
    local ENV_VARS=$3
    local ROLE_POLICY=$4

    echo -e "${YELLOW}📦 Processing ${FUNCTION_NAME}...${NC}"

    # Navigate to function directory
    cd $FUNCTION_NAME

    # Install dependencies
    echo "   Installing dependencies..."
    npm install --production --silent

    # Create ZIP
    echo "   Creating deployment package..."
    zip -r -q ../${FUNCTION_NAME}.zip .
    cd ..

    # Check if Lambda exists
    if lambda_exists $FUNCTION_NAME; then
        echo "   Updating existing function..."
        aws lambda update-function-code \
            --function-name $FUNCTION_NAME \
            --zip-file fileb://${FUNCTION_NAME}.zip \
            --region $AWS_REGION \
            $PROFILE_FLAG \
            --output text > /dev/null

        # Update environment variables if provided
        if [ ! -z "$ENV_VARS" ]; then
            echo "   Updating environment variables..."
            aws lambda update-function-configuration \
                --function-name $FUNCTION_NAME \
                --environment "$ENV_VARS" \
                --region $AWS_REGION \
                $PROFILE_FLAG \
                --output text > /dev/null
        fi

        echo -e "   ${GREEN}✅ Function updated${NC}"
    else
        echo "   Creating new function..."

        # Create IAM role if it doesn't exist
        ROLE_NAME="lambda-${FUNCTION_NAME}-role"
        ROLE_ARN="arn:aws:iam::${AWS_ACCOUNT_ID}:role/${ROLE_NAME}"

        if ! aws iam get-role --role-name $ROLE_NAME $PROFILE_FLAG &> /dev/null; then
            echo "   Creating IAM role..."

            # Create trust policy
            cat > /tmp/trust-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

            aws iam create-role \
                --role-name $ROLE_NAME \
                --assume-role-policy-document file:///tmp/trust-policy.json \
                $PROFILE_FLAG \
                --output text > /dev/null

            # Attach basic Lambda execution policy
            aws iam attach-role-policy \
                --role-name $ROLE_NAME \
                --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole \
                $PROFILE_FLAG

            # Attach additional policy if specified
            if [ "$ROLE_POLICY" == "ses" ]; then
                echo "   Attaching SES policy..."
                cat > /tmp/ses-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ses:SendEmail",
        "ses:SendRawEmail"
      ],
      "Resource": "*"
    }
  ]
}
EOF
                aws iam put-role-policy \
                    --role-name $ROLE_NAME \
                    --policy-name SESPolicy \
                    --policy-document file:///tmp/ses-policy.json \
                    $PROFILE_FLAG
            fi

            echo "   Waiting for IAM role propagation (10 seconds)..."
            sleep 10
        fi

        # Create Lambda function
        aws lambda create-function \
            --function-name $FUNCTION_NAME \
            --runtime $LAMBDA_RUNTIME \
            --role $ROLE_ARN \
            --handler index.handler \
            --zip-file fileb://${FUNCTION_NAME}.zip \
            --timeout $LAMBDA_TIMEOUT \
            --region $AWS_REGION \
            --description "$DESCRIPTION" \
            $PROFILE_FLAG \
            --output text > /dev/null

        # Set environment variables if provided
        if [ ! -z "$ENV_VARS" ]; then
            echo "   Setting environment variables..."
            aws lambda update-function-configuration \
                --function-name $FUNCTION_NAME \
                --environment "$ENV_VARS" \
                --region $AWS_REGION \
                $PROFILE_FLAG \
                --output text > /dev/null
        fi

        echo -e "   ${GREEN}✅ Function created${NC}"
    fi

    # Clean up
    rm ${FUNCTION_NAME}.zip

    echo ""
}

# Check for .env file
if [ -f .env ]; then
    echo -e "${YELLOW}📄 Loading environment variables from .env${NC}\n"
    source .env
else
    echo -e "${YELLOW}⚠️  No .env file found. Using placeholder values.${NC}"
    echo -e "${YELLOW}⚠️  Update Lambda environment variables manually or create .env file${NC}\n"

    STRIPE_SECRET_KEY="sk_test_REPLACE_ME"
    STRIPE_WEBHOOK_SECRET="whsec_REPLACE_ME"
    FRONTEND_URL="https://your-app.amplifyapp.com"
    FROM_EMAIL="ordini@pinaddict.it"
fi

# Deploy create-checkout-session
deploy_lambda \
    "create-checkout-session" \
    "Creates Stripe Checkout sessions for Pin Addict orders" \
    "Variables={STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY},FRONTEND_URL=${FRONTEND_URL}}" \
    ""

# Deploy stripe-webhook
deploy_lambda \
    "stripe-webhook" \
    "Handles Stripe webhooks and sends order confirmation emails" \
    "Variables={STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY},STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET},FRONTEND_URL=${FRONTEND_URL},AWS_REGION=${AWS_REGION},FROM_EMAIL=${FROM_EMAIL}}" \
    "ses"

echo -e "${GREEN}✅ All Lambda functions deployed successfully!${NC}\n"

# Get Lambda ARNs
echo -e "${YELLOW}📝 Lambda Function ARNs:${NC}"
CHECKOUT_ARN=$(aws lambda get-function --function-name create-checkout-session --region $AWS_REGION $PROFILE_FLAG --query 'Configuration.FunctionArn' --output text)
WEBHOOK_ARN=$(aws lambda get-function --function-name stripe-webhook --region $AWS_REGION $PROFILE_FLAG --query 'Configuration.FunctionArn' --output text)

echo "   create-checkout-session: $CHECKOUT_ARN"
echo "   stripe-webhook: $WEBHOOK_ARN"
echo ""

echo -e "${YELLOW}🔧 Next Steps:${NC}"
echo "1. Configure API Gateway:"
echo "   - Create REST API with resources:"
echo "     • /create-checkout-session (POST) → create-checkout-session Lambda"
echo "     • /stripe-webhook (POST) → stripe-webhook Lambda"
echo "   - Enable CORS on /create-checkout-session"
echo "   - Deploy API to 'prod' stage"
echo ""
echo "2. Configure Stripe Webhook:"
echo "   - Go to: https://dashboard.stripe.com/webhooks"
echo "   - Add endpoint with your API Gateway URL"
echo "   - Select events: checkout.session.completed, payment_intent.succeeded"
echo "   - Copy webhook secret and update Lambda environment variable"
echo ""
echo "3. Verify AWS SES:"
if [ ! -z "$AWS_PROFILE" ]; then
    echo "   - Verify sender email: aws ses verify-email-identity --email-address ${FROM_EMAIL} --region ${AWS_REGION} --profile ${AWS_PROFILE}"
else
    echo "   - Verify sender email: aws ses verify-email-identity --email-address ${FROM_EMAIL} --region ${AWS_REGION}"
fi
echo "   - Request production access if not already done"
echo ""
echo "4. Update Frontend:"
echo "   - Set VITE_API_URL in Amplify environment variables"
echo "   - Set VITE_STRIPE_PUBLISHABLE_KEY"
echo "   - Redeploy"
echo ""
echo -e "${GREEN}🎉 For detailed instructions, see STRIPE_DEPLOYMENT_GUIDE.md${NC}"
