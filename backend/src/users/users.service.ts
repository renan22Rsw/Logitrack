import { Injectable } from '@nestjs/common';
import { DatabaseService as PrismaService } from '../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUniqueUser(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    return this.prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }
}
