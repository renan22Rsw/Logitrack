import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ResendModule } from 'nestjs-resend';

@Module({
  providers: [MailService],
  imports: [
    ResendModule.forRoot({
      apiKey: process.env.MAIL_API_KEY,
    }),
  ],
})
export class MailModule {}
