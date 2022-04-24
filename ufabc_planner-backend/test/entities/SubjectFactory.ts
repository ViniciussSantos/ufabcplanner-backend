import { Quarter, Subject } from '@prisma/client';
import { prisma } from 'infra/prisma/client';

export async function createSubject(quarter: Quarter): Promise<Subject> {
  const subject = await prisma.subject.create({
    data: {
      name: 'engenharia de software',
      description: 'link da ementa ou algo que o professor disse',
      quarterId: quarter.id,
    },
  });

  return subject;
}
