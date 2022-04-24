import { prisma } from 'infra/prisma/client';

export async function deleteAll() {
  const deleteUser = prisma.user.deleteMany();
  const deleteAcademicYear = prisma.academicYear.deleteMany();
  const deleteQuarter = prisma.quarter.deleteMany();
  const deleteSubject = prisma.subject.deleteMany();
  await prisma.$transaction([deleteSubject, deleteQuarter, deleteAcademicYear, deleteUser]);
}

export async function disconnect() {
  await prisma.$disconnect();
}
