import { Length } from 'class-validator';

export class ResetPasswordDto {
  @Length(8, 20, {
    message: 'Password must be between 8 and 20 characters long',
  })
  password: string;
}
