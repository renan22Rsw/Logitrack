import { Role } from '@prisma/client';
import { IsString, Length, IsEmail, IsEnum } from 'class-validator';

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

export class CreateUserByAdminDto {
  @IsString({
    message: 'Name must be a string',
  })
  @Length(3, 20, {
    message: 'Name must be between 3 and 20 characters long',
  })
  name: string;

  @IsEmail(
    {},
    {
      message: 'Email is not valid',
    },
  )
  email: string;

  @IsEnum(Role, {
    message: 'Invalid role',
  })
  role: Role;
}
