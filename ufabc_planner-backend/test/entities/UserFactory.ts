import { User } from '@prisma/client';
import { hash } from 'bcryptjs';
import auth from 'config/auth';
import { prisma } from 'infra/prisma/client';
import { sign } from 'jsonwebtoken';
import { emit } from 'process';
import { validPassword } from '../constants';
import { generateRandomEmail, pickRandomName } from '../utils';

//TODO: necessário melhorar esta função
export async function createUser(email?: string, name?: string, password?: string): Promise<User> {
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

export async function authenticateUser(user: User): Promise<string> {
  const token = sign({}, auth.secret_token, {
    subject: user.id,
    expiresIn: auth.expires_in_token,
  });

  return token;
}
