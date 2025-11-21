import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

@Injectable()
export default class EmailService {
  private transporter: Transporter;
  private readonly logger = new Logger(EmailService.name);
  private readonly isDevelopment = process.env.NODE_ENV !== 'production';

  constructor() {
    void this.initializeTransporter();
  }

  private async initializeTransporter() {
    if (this.isDevelopment) {
      const testAccount = await nodemailer.createTestAccount();
      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      this.logger.log('Email service initialized with Ethereal (test)');
    } else {
      this.transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: parseInt('587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      this.logger.log('Email service initialized with production SMTP');
    }
  }

  async sendPasswordResetEmail(email: string, code: string): Promise<void> {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || '"Academiny" <noreply@academiny.com>',
        to: email,
        subject: 'Recuperação de Senha - Academiny',
        html: this.getPasswordResetTemplate(code),
        text: `Seu código de recuperação de senha é: ${code}\nEste código é válido por 15 minutos.`,
      };

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const info = await this.transporter.sendMail(mailOptions);

      if (this.isDevelopment) {
        this.logger.log(
          '════════════════════════════════════════════════════════',
        );
        this.logger.log('EMAIL DE RECUPERAÇÃO DE SENHA ENVIADO');
        this.logger.log(
          '════════════════════════════════════════════════════════',
        );
        this.logger.log(`Para: ${email}`);
        this.logger.log(`Código: ${code}`);
        const previewUrl = nodemailer.getTestMessageUrl(info);
        if (previewUrl) {
          this.logger.log(`Preview URL: ${previewUrl}`);
        }
        this.logger.log(
          '════════════════════════════════════════════════════════',
        );
      } else {
        this.logger.log(`Email de recuperação enviado para: ${email}`);
      }
    } catch (error) {
      this.logger.error('Erro ao enviar email de recuperação:', error);
      throw error;
    }
  }

  private getPasswordResetTemplate(code: string): string {
    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recuperação de Senha</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            padding: 30px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 40px 30px;
          }
          .content p {
            color: #333333;
            line-height: 1.6;
            margin: 0 0 20px;
          }
          .code-box {
            background-color: #f8f9fa;
            border: 2px dashed #667eea;
            border-radius: 6px;
            padding: 20px;
            text-align: center;
            margin: 30px 0;
          }
          .code {
            font-size: 32px;
            font-weight: bold;
            color: #667eea;
            letter-spacing: 8px;
            font-family: 'Courier New', monospace;
          }
          .warning {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .warning p {
            margin: 0;
            color: #856404;
            font-size: 14px;
          }
          .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #6c757d;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Recuperação de Senha</h1>
          </div>
          <div class="content">
            <p>Olá,</p>
            <p>Você solicitou a recuperação de senha da sua conta no <strong>Academiny</strong>.</p>
            <p>Use o código abaixo para redefinir sua senha:</p>
            
            <div class="code-box">
              <div class="code">${code}</div>
            </div>
            
            <div class="warning">
              <p><strong>⏰ Este código expira em 15 minutos.</strong></p>
            </div>
            
            <p>Se você não solicitou esta recuperação de senha, por favor ignore este email. Sua senha permanecerá inalterada.</p>
            
            <p>Atenciosamente,<br>Equipe Academiny</p>
          </div>
          <div class="footer">
            <p>Este é um email automático. Por favor, não responda.</p>
            <p>&copy; ${new Date().getFullYear()} Academiny. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}
