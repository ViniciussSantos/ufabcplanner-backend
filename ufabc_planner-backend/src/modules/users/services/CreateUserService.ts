import { hash } from 'bcryptjs';
import { injectable } from 'tsyringe';
import { AppError } from 'utils/errors/AppError';
import { prisma } from 'utils/prisma';
import { CreateUserDTO } from '../dtos/CreateUserDTO';

@injectable()
export class CreateUserService {
  async execute({ email, name, password }: CreateUserDTO): Promise<void> {
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const passwordHash = await hash(password, 8);

    await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });
  }
}
