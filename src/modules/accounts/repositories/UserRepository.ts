import { User } from '@prisma/client';
import { prisma } from 'infra/prisma/client';
import { CreateUserDTO } from 'modules/accounts/dtos/CreateUser.dto';
import { singleton } from 'tsyringe';

@singleton()
export class UserRepository {
  async exists(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return false;
    }

    return true;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

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
