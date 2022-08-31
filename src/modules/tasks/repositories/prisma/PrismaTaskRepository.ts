import { Task } from '@prisma/client';
import dayjs from 'dayjs';
import { prisma } from 'infra/prisma/client';
import { CreateTaskDTO } from 'modules/tasks/dtos/CreateTask.dto';
import { UpdateTaskDTO } from 'modules/tasks/dtos/UpdateTask.dto';
import { ITaskRepository } from '../ITaskRepository';

export class PrismaTaskRepository implements ITaskRepository {
  async createTask(params: CreateTaskDTO): Promise<void> {
    await prisma.task.create({ data: { ...params, dueDate: dayjs(params.dueDate, 'YYYY-MM-DD').toDate() } });
  }

  async deleteTask(id: string): Promise<void> {
    await prisma.task.delete({ where: { id: id } });
  }

  async updateTask(params: UpdateTaskDTO): Promise<void> {
    await prisma.task.update({
      where: { id: params.id },
      data: { ...params, dueDate: dayjs(params.dueDate).toDate() },
    });
  }

  getTasksBySubjectId(subjectId: string): Promise<Task[]> {
    return prisma.task.findMany({
      where: {
        subjectId: subjectId,
      },
    });
  }

  getTasksByUserId(userId: string): Promise<Task[]> {
    return prisma.task.findMany({
      where: {
        userId: userId,
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

  async taskExists(id: string): Promise<Boolean> {
    const taskExists = await prisma.task.findUnique({
      where: {
        id: id,
      },
    });

    if (!taskExists) return false;

    return true;
  }
}
