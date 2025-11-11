import Stripe from 'stripe';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Initialize AWS SES
const sesClient = new SESClient({ region: process.env.AWS_REGION || 'eu-south-1' });

/**
 * Send confirmation email using AWS SES
 */
const sendConfirmationEmail = async (customerEmail, orderDetails) => {
  const { orderId, amount, items, shippingAddress } = orderDetails;

  // Format items for email
  const itemsList = items.map(item =>
    `- ${item.description} x${item.quantity} - €${(item.amount / 100).toFixed(2)}`
  ).join('\n');

  const emailParams = {
    Source: process.env.FROM_EMAIL || 'ordini@pinaddict.it',
    Destination: {
      ToAddresses: [customerEmail],
    },
    Message: {
      Subject: {
        Data: `Conferma Ordine #${orderId} - Pin Addict`,
        Charset: 'UTF-8',
      },
      Body: {
        Text: {
          Data: `Grazie per il tuo ordine!

Ordine: #${orderId}
Totale: €${(amount / 100).toFixed(2)}

Prodotti ordinati:
${itemsList}

Indirizzo di spedizione:
${shippingAddress.line1 || ''}
${shippingAddress.city || ''}, ${shippingAddress.state || ''} ${shippingAddress.postal_code || ''}
${shippingAddress.country || ''}

Riceverai presto una conferma di spedizione.

Grazie per aver scelto Pin Addict!
Il Team Pin Addict`,
          Charset: 'UTF-8',
        },
        Html: {
          Data: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .items { margin: 15px 0; }
    .item { padding: 10px 0; border-bottom: 1px solid #eee; }
    .total { font-size: 1.2em; font-weight: bold; color: #667eea; margin-top: 15px; }
    .footer { text-align: center; margin-top: 30px; color: #999; font-size: 0.9em; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Grazie per il tuo ordine! 🎉</h1>
    </div>
    <div class="content">
      <p>Ciao,</p>
      <p>Abbiamo ricevuto il tuo ordine e lo stiamo preparando con cura!</p>

      <div class="order-details">
        <h2>Dettagli Ordine #${orderId}</h2>

        <div class="items">
          <h3>Prodotti:</h3>
          ${items.map(item => `
            <div class="item">
              <strong>${item.description}</strong><br>
              Quantità: ${item.quantity} - €${(item.amount / 100).toFixed(2)}
            </div>
          `).join('')}
        </div>

        <div class="total">
          Totale: €${(amount / 100).toFixed(2)}
        </div>
      </div>

      <div class="order-details">
        <h3>Indirizzo di Spedizione:</h3>
        <p>
          ${shippingAddress.line1 || ''}<br>
          ${shippingAddress.city || ''}, ${shippingAddress.state || ''} ${shippingAddress.postal_code || ''}<br>
          ${shippingAddress.country || ''}
        </p>
      </div>

      <p>Riceverai presto una conferma di spedizione.</p>
      <p>Grazie per aver scelto Pin Addict! ✨</p>

      <div class="footer">
        <p>Pin Addict - Calendario dell'Avvento Pop Culture</p>
        <p><a href="https://pinaddict.it">www.pinaddict.it</a></p>
      </div>
    </div>
  </div>
</body>
</html>`,
          Charset: 'UTF-8',
        },
      },
    },
  };

  try {
    const command = new SendEmailCommand(emailParams);
    await sesClient.send(command);
    console.log(`Confirmation email sent to ${customerEmail}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

/**
 * Lambda handler for Stripe webhooks
 */
export const handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    // Get the Stripe signature from headers
    const signature = event.headers['Stripe-Signature'] || event.headers['stripe-signature'];

    if (!signature) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing Stripe signature' }),
      };
    }

    // Verify webhook signature
    let stripeEvent;
    try {
      stripeEvent = stripe.webhooks.constructEvent(
        event.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid signature' }),
      };
    }

    // Handle the event
    console.log('Processing event:', stripeEvent.type);

    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object;

        console.log('Checkout completed:', session.id);

        // Get full session details with line items
        const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ['line_items', 'customer_details'],
        });

        // Extract order details
        const orderDetails = {
          orderId: fullSession.id,
          amount: fullSession.amount_total,
          items: fullSession.line_items.data.map(item => ({
            description: item.description,
            quantity: item.quantity,
            amount: item.amount_total,
          })),
          shippingAddress: fullSession.shipping_details?.address || fullSession.customer_details?.address || {},
        };

        // Send confirmation email
        const customerEmail = fullSession.customer_details?.email || fullSession.metadata?.customerEmail;

        if (customerEmail) {
          await sendConfirmationEmail(customerEmail, orderDetails);
        } else {
          console.warn('No customer email found for session:', session.id);
        }

        // Here you could also:
        // - Save order to DynamoDB
        // - Update inventory
        // - Send notification to admin
        // - Integrate with fulfillment system

        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = stripeEvent.data.object;
        console.log('Payment succeeded:', paymentIntent.id);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = stripeEvent.data.object;
        console.error('Payment failed:', paymentIntent.id);
        break;
      }

      default:
        console.log('Unhandled event type:', stripeEvent.type);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error('Error processing webhook:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Webhook processing failed',
        message: error.message
      }),
    };
  }
};
