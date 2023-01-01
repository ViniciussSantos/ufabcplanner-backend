import { User } from '@prisma/client';
import { hash } from 'bcryptjs';
import auth from 'config/auth';
import { prisma } from 'infra/prisma/client';
import { sign } from 'jsonwebtoken';
import { validPassword } from '../constants';
import { generateRandomEmail, generateRandomName } from '../utils';

//TODO: necessário melhorar esta função
export async function createUser(email?: string, name?: string, password?: string): Promise<User> {
  const user = await prisma.user.create({
    data: {
      name: name || generateRandomName(),
      email: email || generateRandomEmail(),
      password: await hash(password || validPassword, 8),
    },
  });

  return user;
}

export function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export function authenticateUser(user: User): string {
  return sign({}, auth.secretToken, {
    subject: user.id,
    expiresIn: auth.expiresInToken,
  });
}
