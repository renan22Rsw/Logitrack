import { PartialType } from '@nestjs/mapped-types';
import { CreateUserByAdminDto, CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserByAdminDto extends PartialType(CreateUserByAdminDto) {}
