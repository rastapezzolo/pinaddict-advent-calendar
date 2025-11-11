# Lambda Functions per Stripe Integration

Queste Lambda functions gestiscono i pagamenti Stripe e l'invio delle email di conferma.

## 📁 Struttura

```
lambda/
├── create-checkout-session/    # Crea sessione Stripe Checkout
│   ├── index.js
│   └── package.json
├── stripe-webhook/              # Gestisce webhook Stripe + email
│   ├── index.js
│   └── package.json
└── .env.example                 # Template variabili d'ambiente
```

## 🚀 Quick Deploy

### 1. Installa dipendenze e crea archivi ZIP

```bash
# Deploy create-checkout-session
cd create-checkout-session
npm install
zip -r ../create-checkout-session.zip .
cd ..

# Deploy stripe-webhook
cd stripe-webhook
npm install
zip -r ../stripe-webhook.zip .
cd ..
```

### 2. Deploy su AWS Lambda (via AWS CLI)

#### Create Checkout Session Lambda

```bash
# Crea la Lambda
aws lambda create-function \
  --function-name create-checkout-session \
  --runtime nodejs18.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-execution-role \
  --handler index.handler \
  --zip-file fileb://create-checkout-session.zip \
  --timeout 30 \
  --region eu-south-1

# Imposta variabili d'ambiente
aws lambda update-function-configuration \
  --function-name create-checkout-session \
  --environment Variables="{STRIPE_SECRET_KEY=sk_test_YOUR_KEY,FRONTEND_URL=https://your-url.amplifyapp.com}" \
  --region eu-south-1
```

#### Stripe Webhook Lambda

```bash
# Crea la Lambda
aws lambda create-function \
  --function-name stripe-webhook \
  --runtime nodejs18.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-ses-execution-role \
  --handler index.handler \
  --zip-file fileb://stripe-webhook.zip \
  --timeout 30 \
  --region eu-south-1

# Imposta variabili d'ambiente
aws lambda update-function-configuration \
  --function-name stripe-webhook \
  --environment Variables="{STRIPE_SECRET_KEY=sk_test_YOUR_KEY,STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET,FRONTEND_URL=https://your-url.amplifyapp.com,AWS_REGION=eu-south-1,FROM_EMAIL=ordini@pinaddict.it}" \
  --region eu-south-1
```

### 3. Aggiorna Lambda esistenti

```bash
# Aggiorna create-checkout-session
cd create-checkout-session
zip -r ../create-checkout-session.zip .
cd ..
aws lambda update-function-code \
  --function-name create-checkout-session \
  --zip-file fileb://create-checkout-session.zip \
  --region eu-south-1

# Aggiorna stripe-webhook
cd stripe-webhook
zip -r ../stripe-webhook.zip .
cd ..
aws lambda update-function-code \
  --function-name stripe-webhook \
  --zip-file fileb://stripe-webhook.zip \
  --region eu-south-1
```

## 🔧 Configurazione

### Variabili d'Ambiente

Copia `.env.example` e modifica con i tuoi valori:

#### create-checkout-session
- `STRIPE_SECRET_KEY`: Secret key Stripe (da Dashboard)
- `FRONTEND_URL`: URL Amplify per redirect

#### stripe-webhook
- `STRIPE_SECRET_KEY`: Secret key Stripe
- `STRIPE_WEBHOOK_SECRET`: Webhook signing secret (da Stripe Dashboard)
- `FRONTEND_URL`: URL Amplify
- `AWS_REGION`: Regione AWS (default: eu-south-1)
- `FROM_EMAIL`: Email mittente verificata su SES

### Permessi IAM

#### create-checkout-session
Richiede policy base Lambda:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
```

#### stripe-webhook
Richiede policy Lambda + SES:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    },
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
```

## 📝 API Endpoints

Dopo aver configurato API Gateway, avrai:

### POST /create-checkout-session

**Request:**
```json
{
  "cartItems": [
    {
      "product": {
        "id": 1,
        "name": "Calendario dell'Avvento",
        "price": 49.99,
        "description": "24 pin esclusivi"
      },
      "quantity": 1
    }
  ],
  "customerEmail": "cliente@example.com",
  "shippingAddress": {
    "street": "Via Roma 123",
    "city": "Milano",
    "province": "MI",
    "postalCode": "20100"
  }
}
```

**Response:**
```json
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/c/pay/cs_test_..."
}
```

### POST /stripe-webhook

Endpoint chiamato automaticamente da Stripe. Non chiamare manualmente.

**Headers richiesti:**
- `Stripe-Signature`: Firma webhook

## 🧪 Testing Locale

### 1. Installa Stripe CLI

```bash
brew install stripe/stripe-cli/stripe
stripe login
```

### 2. Test create-checkout-session

```bash
cd create-checkout-session
npm install

# Imposta env vars
export STRIPE_SECRET_KEY=sk_test_YOUR_KEY
export FRONTEND_URL=http://localhost:5173

# Test locale
node -e "
const handler = require('./index').handler;
const event = {
  httpMethod: 'POST',
  body: JSON.stringify({
    cartItems: [{
      product: { id: 1, name: 'Test', price: 49.99, description: 'Test product' },
      quantity: 1
    }],
    customerEmail: 'test@example.com',
    shippingAddress: { street: 'Test', city: 'Test', province: 'TE', postalCode: '12345' }
  })
};
handler(event).then(console.log);
"
```

### 3. Test webhook con Stripe CLI

```bash
# Forward webhook a localhost
stripe listen --forward-to http://localhost:3000/stripe-webhook

# In altro terminale, trigger un evento
stripe trigger checkout.session.completed
```

## 📊 Monitoring

### CloudWatch Logs

```bash
# Visualizza log create-checkout-session
aws logs tail /aws/lambda/create-checkout-session --follow --region eu-south-1

# Visualizza log stripe-webhook
aws logs tail /aws/lambda/stripe-webhook --follow --region eu-south-1
```

### Metriche CloudWatch

Le Lambda generano automaticamente metriche su:
- Invocazioni
- Errori
- Durata
- Throttle

Visualizzale su: AWS Console → CloudWatch → Metrics → Lambda

## 🔍 Troubleshooting

### Errore: "Unable to import module"

**Causa**: Dipendenze non incluse nello ZIP.

**Soluzione**:
```bash
cd create-checkout-session
rm -rf node_modules
npm install --production
zip -r ../create-checkout-session.zip .
```

### Errore: "Missing Stripe signature"

**Causa**: Header non passato da API Gateway.

**Soluzione**: Abilita "Use Lambda Proxy Integration" su API Gateway.

### Email non inviate

**Causa**: Email non verificata su SES o in sandbox mode.

**Soluzione**:
1. Verifica email: `aws ses verify-email-identity --email-address ordini@pinaddict.it --region eu-south-1`
2. Richiedi uscita da sandbox (vedi STRIPE_DEPLOYMENT_GUIDE.md)

### Timeout Lambda

**Causa**: Stripe API lenta o timeout troppo basso.

**Soluzione**:
```bash
aws lambda update-function-configuration \
  --function-name create-checkout-session \
  --timeout 30 \
  --region eu-south-1
```

## 🔐 Sicurezza

- ✅ Non committare mai chiavi secret su Git
- ✅ Usa sempre environment variables per secrets
- ✅ Verifica webhook signature (già implementato)
- ✅ Abilita HTTPS su tutti gli endpoint
- ✅ Usa principle of least privilege per IAM roles
- ✅ Monitora CloudWatch Logs per attività sospette

## 📈 Performance

### Ottimizzazioni

1. **Cold Start**: Lambda Node.js 18 ha cold start di ~200-500ms
2. **Memory**: Default 128MB è sufficiente, aumenta a 256MB se necessario
3. **Timeout**: 30 secondi è appropriato per API Stripe
4. **Provisioned Concurrency**: Non necessario per volumi bassi (<100 req/min)

### Best Practices

- ✅ Riutilizza connessioni Stripe (già implementato)
- ✅ Gestisci timeout ed errori gracefully
- ✅ Log errori per debugging
- ✅ Usa async/await correttamente
- ✅ Valida input prima di chiamare Stripe

## 📚 Risorse

- [Stripe Node.js SDK](https://github.com/stripe/stripe-node)
- [AWS Lambda Node.js](https://docs.aws.amazon.com/lambda/latest/dg/lambda-nodejs.html)
- [AWS SES Developer Guide](https://docs.aws.amazon.com/ses/latest/dg/)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)

---

Per la guida completa di deployment, vedi [STRIPE_DEPLOYMENT_GUIDE.md](../STRIPE_DEPLOYMENT_GUIDE.md)
