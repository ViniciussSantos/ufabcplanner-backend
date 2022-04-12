import { prisma } from 'utils/prisma';

export async function closeConnections() {
  const deleteUser = prisma.user.deleteMany();

  await prisma.$transaction([deleteUser]);

  await prisma.$disconnect();
}
