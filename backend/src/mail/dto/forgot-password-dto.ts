import { IsEmail, Length } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail(
    {},
    {
      message: 'Email is not valid',
    },
  )
  @Length(8, 20, {
    message: 'Password must be between 8 and 20 characters long',
  })
  email: string;
}
