import { hash } from 'bcryptjs';
import { prisma } from 'infra/prisma/client';
import { inject, injectable } from 'tsyringe';
import { AppError } from 'infra/http/errors/AppError';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { IUsersRepository } from '../repositories/IUsersRepository';

@injectable()
export class CreateUserService {
  constructor(
    @inject('PrismaUserRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, name, password }: CreateUserDTO): Promise<void> {
    const userExists = await this.usersRepository.exists(email);
    if (userExists) {
      throw new AppError('E-mail já utilizado, usuário já existente!');
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });
  }
}
