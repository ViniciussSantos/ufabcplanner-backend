import { User } from '@prisma/client';
import { prisma } from 'infra/prisma/client';
import { CreateUserDTO } from 'modules/accounts/dtos/CreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

export class PrismaUserRepository implements IUsersRepository {
  async exists(email: string): Promise<boolean> {
    const user = prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) return false;

    return true;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) return null;

    return user;
  }

  async create(user: CreateUserDTO): Promise<void> {
    await prisma.user.create({
      data: {
        ...user,
      },
    });
  }
}
