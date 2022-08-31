import { User } from '@prisma/client';
import { CreateUserDTO } from '../dtos/CreateUser.dto';

export interface IUsersRepository {
  exists(email: string): Promise<boolean>;
  findByEmail(email: string): Promise<User | null>;
  create(user: CreateUserDTO): Promise<void>;
}
