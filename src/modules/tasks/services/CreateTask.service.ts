import { singleton } from 'tsyringe';
import { CreateTaskDTO } from '../dtos/CreateTask.dto';
import { PrismaTaskRepository } from '../repositories/prisma/PrismaTaskRepository';

@singleton()
export class CreateTaskService {
  constructor(private taskRepository: PrismaTaskRepository) {}

  async execute(params: CreateTaskDTO): Promise<void> {
    await this.taskRepository.createTask(params);
  }
}
