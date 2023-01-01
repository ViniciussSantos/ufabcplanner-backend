import { Exam, Subject, User } from '@prisma/client';
import dayjs from 'dayjs';
import { prisma } from 'infra/prisma/client';

export function createExam(subject: Subject, user: User): Promise<Exam> {
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

export function getExamById(id: string): Promise<Exam | null> {
  return prisma.exam.findUnique({
    where: {
      id,
    },
  });
}
