import { Subject, Task, User } from '@prisma/client';
import dayjs from 'dayjs';
import { prisma } from 'infra/prisma/client';

export function createTask(subject: Subject, user: User): Promise<Task> {
  return prisma.task.create({
    data: {
      subjectId: subject.id,
      userId: user.id,
      title: 'Titulo de task',
      dueDate: dayjs().toDate(),
      description: 'descrição de uma task',
    },
  });
}

export function getTaskById(id: string): Promise<Task | null> {
  return prisma.task.findUnique({ where: { id } });
}
