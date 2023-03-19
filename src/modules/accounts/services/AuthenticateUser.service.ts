import { compare } from 'bcryptjs';
import auth from 'config/auth';
import { sign } from 'jsonwebtoken';
import { singleton } from 'tsyringe';
import { AuthenticateUserDTO } from '../dtos/AuthenticateUser.dto';
import { UserRepository } from '../repositories/UserRepository';
import { ForbiddenError } from 'infra/http/errors/ForbiddenError';

interface IResponse {
  token: string;
}

@singleton()
export class AuthenticateUserService {
  constructor(private usersRepository: UserRepository) {}

  async execute({ email, password }: AuthenticateUserDTO): Promise<IResponse> {
    const { expiresInToken, secretToken } = auth;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new ForbiddenError('Senha ou e-mail incorreto');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new ForbiddenError('Senha ou e-mail incorreto');
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
