import { Task } from '@prisma/client';
import dayjs from 'dayjs';
import { prisma } from 'infra/prisma/client';
import { CreateTaskDTO } from 'modules/tasks/dtos/CreateTask.dto';
import { UpdateTaskDTO } from 'modules/tasks/dtos/UpdateTask.dto';
import { singleton } from 'tsyringe';

@singleton()
export class TaskRepository {
  async create(params: CreateTaskDTO): Promise<void> {
    await prisma.task.create({ data: { ...params, dueDate: dayjs(params.dueDate, 'YYYY-MM-DD').toDate() } });
  }

  async delete(id: string): Promise<void> {
    await prisma.task.delete({ where: { id } });
  }

  async update({ id, ...params }: UpdateTaskDTO): Promise<void> {
    await prisma.task.update({
      where: { id },
      data: { ...params, dueDate: dayjs(params.dueDate).toDate() },
    });
  }

  getBySubjectId(subjectId: string): Promise<Task[]> {
    return prisma.task.findMany({
      where: {
        subjectId,
      },
    });
  }

  getByUserId(userId: string): Promise<Task[]> {
    return prisma.task.findMany({
      where: {
        userId,
      },
      include: {
        subject: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async exists(id: string): Promise<boolean> {
    const taskExists = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!taskExists) {
      return false;
    }

    return true;
  }
}
