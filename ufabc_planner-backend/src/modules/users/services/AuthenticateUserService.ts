import { compare } from 'bcryptjs';
import auth from 'config/auth';
import { sign } from 'jsonwebtoken';
import { injectable } from 'tsyringe';
import { AppError } from 'utils/errors/AppError';
import { prisma } from 'utils/prisma';
import { AuthenticateUserDTO } from '../dtos/AuthenticateUserDTO';

interface IResponse {
  token: string;
}
@injectable()
export class AuthenticateUserService {
  async execute({ email, password }: AuthenticateUserDTO): Promise<IResponse> {
    const { expires_in_token, secret_token } = auth;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

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
