import { Task } from '@prisma/client';
import { singleton } from 'tsyringe';
import { GetTasksByUserIdDTO } from '../dtos/GetTasksByUserId.dto';
import { PrismaTaskRepository } from '../repositories/prisma/PrismaTaskRepository';

@singleton()
export class GetTasksByUserIdService {
  constructor(private taskRepository: PrismaTaskRepository) {}

  execute({ id }: GetTasksByUserIdDTO): Promise<Task[]> {
    return this.taskRepository.getTasksByUserId(id);
  }
}
