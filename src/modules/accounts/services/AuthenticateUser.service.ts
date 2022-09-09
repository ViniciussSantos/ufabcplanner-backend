import { compare } from 'bcryptjs';
import auth from 'config/auth';
import { prisma } from 'infra/prisma/client';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { AppError } from 'infra/http/errors/AppError';
import { AuthenticateUserDTO } from '../dtos/AuthenticateUser.dto';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IResponse {
  token: string;
}

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject('PrismaUserRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: AuthenticateUserDTO): Promise<IResponse> {
    const { expires_in_token, secret_token } = auth;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Senha ou e-mail incorreto');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Senha ou e-mail incorreto');
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      secret_token,
      {
        subject: user.id,
        expiresIn: expires_in_token,
      }
    );

    return { token };
  }
}
