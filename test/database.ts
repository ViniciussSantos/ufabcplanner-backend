import { prisma } from 'infra/prisma/client';

export async function deleteAll() {
  const deleteUser = prisma.user.deleteMany();
  const deleteAcademicYear = prisma.academicYear.deleteMany();
  const deleteQuarter = prisma.quarter.deleteMany();
  const deleteSubject = prisma.subject.deleteMany();
  const deleteClass = prisma.class.deleteMany();
  const deleteTask = prisma.task.deleteMany();
  const deleteExam = prisma.exam.deleteMany();

  await prisma.$transaction([
    deleteExam,
    deleteTask,
    deleteClass,
    deleteSubject,
    deleteQuarter,
    deleteAcademicYear,
    deleteUser,
  ]);
}

export async function disconnect() {
  await prisma.$disconnect();
}
