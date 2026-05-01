import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: 'Name must be a string',
  })
  @Length(3, 20, {
    message: 'Name must be at least 3 characters long',
  })
  name: string;

  @IsEmail(
    {},
    {
      message: 'Email is not valid',
    },
  )
  email: string;

  @Length(8, 20, {
    message: 'Password must be at least 8 characters long',
  })
  password: string;
}
