import { Class, Subject, User } from '@prisma/client';
import { prisma } from 'infra/prisma/client';

export async function createClass(user: User, subject: Subject): Promise<Class> {
  const Class = await prisma.class.create({
    data: {
      subjectId: subject.id,
      userId: user.id,
      professor: 'Paulo Meirelles',
      room: 'A202',
      campus: 'Santo André',
      building: 'Bloco A',
      startTime: '10:00',
      endTime: '12:00',
      weekday: 'seg',
      biweeklyType: 'week1',
    },
  });

  return Class;
}

export function getClassById(id: string) {
  return prisma.class.findUnique({
    where: {
      id,
    },
  });
}

export function getClassBySubjectId(subjectId: string) {
  return prisma.class.findFirst({
    where: {
      subjectId,
    },
  });
}
