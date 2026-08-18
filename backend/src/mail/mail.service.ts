import { Injectable } from '@nestjs/common';
import { ResendService } from 'nestjs-resend';

@Injectable()
export class MailService {
  constructor(private readonly resendService: ResendService) {}

  async sendForgotPasswordEmail(
    to: string,
    userName: string,
    temporaryPassword: string,
  ) {
    const loginUrl = 'http://localhost:3000/sign-in'; //must change

    await this.resendService.send({
      from: 'onboarding@resend.dev',
      to,
      subject: 'Resetar senha',
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #333;">
        <h2 style="color: #111;">Bem-vindo(a), ${userName}!</h2>
        <p>Uma nova senha foi gerada para você acessar o sistema:</p>

        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr>
            <td style="padding: 8px 0;"><strong>E-mail:</strong></td>
            <td style="padding: 8px 0;">${to}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Senha temporária:</strong></td>
            <td style="padding: 8px 0;">${temporaryPassword}</td>
          </tr>
        </table>

        <p>
          <a href="${loginUrl}" style="display: inline-block; padding: 10px 20px; background-color: #111; color: #fff; text-decoration: none; border-radius: 6px;">
            Acessar minha conta
          </a>
        </p>

        <p style="font-size: 13px; color: #666;">
          Por segurança, altere sua senha assim que fizer login.
        </p>
      </div>
    `,
    });
  }

  async sendUserCreatedByAdminEmail(
    to: string,
    userName: string,
    temporaryPassword: string,
  ) {
    const loginUrl = 'http://localhost:3000/sign-in'; //must change

    await this.resendService.send({
      from: 'onboarding@resend.dev',
      to,
      subject: 'Sua conta foi criada',
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #333;">
        <h2 style="color: #111;">Bem-vindo(a), ${userName}!</h2>
        <p>Seu usuário foi criado com sucesso pelo admnistrador. Use os dados abaixo para acessar sua conta:</p>

        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr>
            <td style="padding: 8px 0;"><strong>E-mail:</strong></td>
            <td style="padding: 8px 0;">${to}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Senha temporária:</strong></td>
            <td style="padding: 8px 0;">${temporaryPassword}</td>
          </tr>
        </table>

        <p>
          <a href="${loginUrl}" style="display: inline-block; padding: 10px 20px; background-color: #111; color: #fff; text-decoration: none; border-radius: 6px;">
            Acessar minha conta
          </a>
        </p>

        <p style="font-size: 13px; color: #666;">
          Por segurança, altere sua senha assim que fizer login.
        </p>
      </div>
    `,
    });
  }

  async sendUserUpdatedByAdminEmail(to: string, userName: string) {
    const loginUrl = 'http://localhost:3000/sign-in'; //must change

    await this.resendService.send({
      from: 'onboarding@resend.dev',
      to,
      subject: 'Seus dados foram atualizados',
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #333;">
        <h2 style="color: #111;">Olá, ${userName}</h2>
        <p>Seu usuário foi atualizado por um administrador com sucesso.</p>

      

        <p>
          <a href="${loginUrl}" style="display: inline-block; padding: 10px 20px; background-color: #111; color: #fff; text-decoration: none; border-radius: 6px;">
            Acessar minha conta
          </a>
        </p>

        <p style="font-size: 13px; color: #666;">
          Se você não reconhece essa alteração, entre em contato com o administrador do sistema o quanto antes.
        </p>
      </div>
    `,
    });
  }
}
