import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendVerificationEmail(to: string, token: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Vérification de votre e-mail - Smart Services',
      html: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Verification Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
        }

        .header {
            background-color: #ff7a00;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }

        .header h1 {
            margin: 0;
            font-size: 28px;
        }

        .body-content {
            padding: 30px;
            color: #333333;
        }

        .body-content h2 {
            color: #ff7a00;
            font-size: 24px;
        }

        .body-content p {
            font-size: 16px;
            line-height: 1.6;
        }

        .cta-button {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 24px;
            background-color: #ff6600;
            color: #ffffff;
            text-decoration: none;
            font-weight: bold;
            border-radius: 5px;
        }

        .cta-button:hover {
            background-color: #e65c00;
        }

        .footer {
            background-color: #333333;
            color: #ffffff;
            text-align: center;
            padding: 20px;
            font-size: 14px;
        }

        .footer p {
            margin: 0;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <h1>Smart Services</h1>
        </div>

        <!-- Body Content -->
        <div class="body-content">
            <h2>Vérifiez votre adresse e-mail</h2>
            <p>Bonjour,</p>
            <p>Merci de vous être inscrit à <strong>Smart Services</strong> ! Veuillez confirmer votre adresse e-mail en cliquant sur le bouton ci-dessous.</p>
            <a href="${process.env.FRONTEND_URL}/verify?token=${token}" class="cta-button">Vérifier mon e-mail</a>
            <p>Si vous n'avez pas créé de compte, vous pouvez ignorer cet e-mail en toute sécurité.</p>
            <p>Cordialement,<br>L'équipe Smart Services</p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>&copy; 2024 Smart Services. Tous droits réservés.</p>
            <p>Vous avez reçu cet e-mail car vous vous êtes inscrit sur notre site. Si ce n'était pas vous, veuillez nous contacter immédiatement.</p>
        </div>
    </div>
</body>

</html>
`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
