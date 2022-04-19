import { User } from '@prisma/client';
import { hash } from 'bcryptjs';
import { prisma } from 'infra/prisma/client';
import { emit } from 'process';
import { validPassword } from '../constants';
import { generateRandomEmail, pickRandomName } from '../utils';

//TODO: necessário melhorar esta função
export async function createUser(name?: string, email?: string, password?: string): Promise<User> {
  const user = await prisma.user.create({
    data: {
      name: name || 'teste',
      email: email || 'teste@email.com',
      password: await hash(password || '123', 8),
    },
  });
  return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}
