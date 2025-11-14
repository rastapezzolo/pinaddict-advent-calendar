const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

// Hardcoded region since AWS_REGION is reserved in Lambda
const sesClient = new SESClient({ region: 'us-east-1' });

exports.handler = async (event) => {
  console.log('Contact form submission received:', JSON.stringify(event, null, 2));

  // Handle OPTIONS preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  // Parse request body
  let body;
  try {
    if (typeof event.body === 'string') {
      body = JSON.parse(event.body);
    } else if (event.body && typeof event.body === 'object') {
      body = event.body;
    } else {
      throw new Error('Invalid request body');
    }
  } catch (error) {
    console.error('Error parsing request body:', error);
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ error: 'Invalid request body' }),
    };
  }

  const { name, email, message } = body;

  // Validate required fields
  if (!name || !email || !message) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ error: 'Missing required fields' }),
    };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ error: 'Invalid email format' }),
    };
  }

  const fromEmail = process.env.FROM_EMAIL || 'info@pinaddict.it';
  const adminEmail = process.env.ADMIN_EMAIL || 'info@pinaddict.it';

  // Create email HTML
  const htmlBody = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border: 1px solid #e0e0e0;
            border-top: none;
            border-radius: 0 0 10px 10px;
          }
          .field {
            margin-bottom: 20px;
            background: white;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid #667eea;
          }
          .field-label {
            font-weight: bold;
            color: #667eea;
            text-transform: uppercase;
            font-size: 12px;
            margin-bottom: 5px;
          }
          .field-value {
            color: #333;
            font-size: 16px;
          }
          .message-box {
            background: white;
            padding: 20px;
            border-radius: 5px;
            border: 1px solid #e0e0e0;
            white-space: pre-wrap;
            font-family: 'Courier New', monospace;
            margin-top: 10px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            color: #999;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin: 0; font-size: 24px;">📬 Nuovo Messaggio di Contatto</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Pin Addict - Form Contatti</p>
        </div>

        <div class="content">
          <div class="field">
            <div class="field-label">👤 Nome</div>
            <div class="field-value">${name}</div>
          </div>

          <div class="field">
            <div class="field-label">✉️ Email</div>
            <div class="field-value"><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></div>
          </div>

          <div class="field">
            <div class="field-label">💬 Messaggio</div>
            <div class="message-box">${message}</div>
          </div>

          <div class="footer">
            <p>Ricevuto da: ${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}</p>
            <p style="margin-top: 10px;">
              <strong>Rispondi direttamente a:</strong>
              <a href="mailto:${email}" style="color: #667eea;">${email}</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  const textBody = `
NUOVO MESSAGGIO DI CONTATTO - Pin Addict

Nome: ${name}
Email: ${email}

Messaggio:
${message}

---
Ricevuto: ${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}
Rispondi a: ${email}
  `;

  try {
    // Send email to admin
    const params = {
      Source: fromEmail,
      Destination: {
        ToAddresses: [adminEmail],
      },
      ReplyToAddresses: [email], // User can reply directly to the customer
      Message: {
        Subject: {
          Data: `📬 Nuovo Contatto da ${name}`,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: htmlBody,
            Charset: 'UTF-8',
          },
          Text: {
            Data: textBody,
            Charset: 'UTF-8',
          },
        },
      },
    };

    const command = new SendEmailCommand(params);
    await sesClient.send(command);

    console.log('Contact form email sent successfully to:', adminEmail);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({
        success: true,
        message: 'Messaggio inviato con successo',
      }),
    };
  } catch (error) {
    console.error('Error sending contact form email:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({
        error: 'Errore durante l\'invio del messaggio. Riprova.',
        details: error.message,
      }),
    };
  }
};
