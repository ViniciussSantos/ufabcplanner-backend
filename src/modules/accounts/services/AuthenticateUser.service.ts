import { compare } from 'bcryptjs';
import auth from 'config/auth';
import { sign } from 'jsonwebtoken';
import { singleton } from 'tsyringe';
import { AppError } from 'infra/http/errors/AppError';
import { AuthenticateUserDTO } from '../dtos/AuthenticateUser.dto';
import { PrismaUserRepository } from '../repositories/prisma/PrismaUserRepository';

interface IResponse {
  token: string;
}

@singleton()
export class AuthenticateUserService {
  constructor(private usersRepository: PrismaUserRepository) {}

  async execute({ email, password }: AuthenticateUserDTO): Promise<IResponse> {
    const { expiresInToken, secretToken } = auth;

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
      secretToken,
      {
        subject: user.id,
        expiresIn: expiresInToken,
      },
    );

    return { token };
  }
}
