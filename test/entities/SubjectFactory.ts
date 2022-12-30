import { Quarter, Subject, User } from '@prisma/client';
import { prisma } from 'infra/prisma/client';

export function createSubject(quarter: Quarter, user: User): Promise<Subject> {
  return prisma.subject.create({
    data: {
      name: 'engenharia de software',
      description: 'link da ementa ou algo que o professor disse',
      quarterId: quarter.id,
      userId: user.id,
    },
  });
}

export function getFirstSubjectByQuarterId(quarterId: string): Promise<Subject | null> {
  return prisma.subject.findFirst({
    where: {
      quarterId,
    },
  });
}

export function getSubjectById(id: string): Promise<Subject | null> {
  return prisma.subject.findUnique({
    where: {
      id,
    },
  });
}
