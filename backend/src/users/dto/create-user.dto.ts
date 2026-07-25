import { Role } from '@prisma/client';
import { IsString, Length, IsEmail, IsEnum, IsOptional } from 'class-validator';

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
    message: 'Password must be between 8 and 20 characters long',
  })
  password: string;

  @IsOptional()
  @Length(10, 100, {
    message: 'About must be between 10 and 100 characters long',
  })
  about: string;
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
