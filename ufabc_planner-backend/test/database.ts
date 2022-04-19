import { prisma } from 'infra/prisma/client';

export async function deleteAll() {
  const deleteUser = prisma.user.deleteMany();
  const deleteAcademicYear = prisma.academicYear.deleteMany();

  await prisma.$transaction([deleteUser, deleteAcademicYear]);
}

export async function disconnect() {
  await prisma.$disconnect();
}
