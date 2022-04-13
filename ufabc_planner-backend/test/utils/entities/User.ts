import { User } from '@prisma/client';
import { hash } from 'bcryptjs';
import { prisma } from 'utils/prisma';
import { validPassword } from '../constants';
import { generateRandomEmail, pickRandomName } from '../utils';

//TODO: necessário melhorar esta função
export async function createRandomUser(): Promise<User> {
  const name = pickRandomName() || 'test';
  const email = generateRandomEmail();

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: await hash(validPassword, 8),
    },
  });
  return user;
}

export async function getUser(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      id: id,
    },
  });
}
