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
          /* Reset básico */
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
          
          /* Container Principal */
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px; /* Mais arredondado = mais moderno */
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          }

          /* Header com Gradiente */
          .header {
            background: #fdfbfb; 
            background: linear-gradient(120deg, #ffffff 0%, #ebedee 100%);  
            color: #333333; 
            padding: 40px 20px;
            text-align: center;
            border-bottom: 1px solid #e5e5e5;
          }
          
          .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
            letter-spacing: -1px;
          }
          
          .header h1 {
            margin: 0;
            font-size: 20px;
            font-weight: 500;
            opacity: 0.9;
          }

          /* Conteúdo */
          .content { padding: 40px 30px; }
          
          .text-main {
            color: #333333;
            line-height: 1.6;
            font-size: 16px;
            margin: 0 0 20px;
          }

          /* Caixa do Código */
          .code-box {
            background-color: #f0f4ff;
            border: 2px dashed #667eea;
            border-radius: 8px;
            padding: 24px;
            text-align: center;
            margin: 30px 0;
          }
          
          .code-label {
            font-size: 12px;
            text-transform: uppercase;
            color: #764ba2;
            font-weight: 600;
            margin-bottom: 8px;
            display: block;
          }
          
          .code {
            font-size: 36px;
            font-weight: 800;
            color: #2d3748;
            letter-spacing: 6px;
            font-family: 'Courier New', monospace;
          }

          /* Aviso e Footer */
          .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #9ca3af;
            font-size: 12px;
            border-top: 1px solid #eeeeee;
          }

          /* Utilitários para esconder o preheader na visualização visual, mas manter no código */
          .preheader {
            display: none !important;
            visibility: hidden;
            mso-hide: all;
            font-size: 1px;
            line-height: 1px;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
          }
        </style>
      </head>
      <body>
        
        <div class="preheader">
          Seu código de verificação é ${code}. Use este código para redefinir sua senha no Academiny. Expira em 15 minutos.
        </div>

        <div class="container">
          <div class="header">
            <img 
              src="https://mcophewsxcqhxzbxocgq.supabase.co/storage/v1/object/public/assets/academiny-logo.png" 
              alt="Academiny" 
              class="logo-academiny-img"
              width="200" 
              style="max-width: 150px; height: auto;"
            />
          </div>
            
          <div class="content">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Recuperação de Senha</h1>
            <p class="text-main">Olá,</p>
            <p class="text-main">Recebemos uma solicitação para redefinir a senha da sua conta.</p>
            
            <div class="code-box">
              <span class="code-label">Seu código de verificação</span>
              <div class="code">${code}</div>
            </div>
            
            <p class="text-main" style="font-size: 14px; color: #666;">
              ⏰ Este código expira em <strong>15 minutos</strong>.
            </p>
            
            <p class="text-main" style="margin-top: 30px;">
              Se você não solicitou essa alteração, nenhuma ação é necessária e sua conta permanece segura.
            </p>
          </div>
          
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Academiny Inc.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}
