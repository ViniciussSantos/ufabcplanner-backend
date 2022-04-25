import { User } from '@prisma/client';
import { CreateUserDTO } from '../dtos/CreateUserDTO';

export interface IUsersRepository {
  exists(email: string): Promise<boolean>;
  findByEmail(email: string): Promise<User | null>;
  create(user: CreateUserDTO): Promise<void>;
}
