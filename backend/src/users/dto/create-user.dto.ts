import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 40)
  name: string;

  @IsEmail()
  email: string;

  @Length(8, 20)
  password: string;
}
