import { hash } from 'bcryptjs';
import { singleton } from 'tsyringe';
import { CreateUserDTO } from '../dtos/CreateUser.dto';
import { UserRepository } from '../repositories/UserRepository';
import { ObjectAlreadyExistsError } from 'infra/http/errors/ObjectAlreadyExistsError';

@singleton()
export class CreateUserService {
  constructor(private usersRepository: UserRepository) {}

  async execute({ email, name, password }: CreateUserDTO): Promise<void> {
    const userExists = await this.usersRepository.exists(email);

    if (userExists) {
      throw new ObjectAlreadyExistsError('usuário');
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });
  }
}
