import { Subject, User } from '@prisma/client';
import dayjs from 'dayjs';
import { prisma } from 'infra/prisma/client';

export async function createExam(subject: Subject, user: User) {
  return prisma.exam.create({
    data: {
      subjectId: subject.id,
      userId: user.id,
      name: 'prova de FUV',
      dueDate: dayjs().toDate(),
      time: '10:00',
      description: 'descrição de uma prova',
    },
  });
}

export async function findExamById(id: string) {
  return prisma.exam.findUnique({
    where: {
      id: id,
    },
  });
}
