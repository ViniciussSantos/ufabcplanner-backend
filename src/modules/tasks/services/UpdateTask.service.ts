import { singleton } from 'tsyringe';
import { UpdateTaskDTO } from '../dtos/UpdateTask.dto';
import { PrismaTaskRepository } from '../repositories/prisma/PrismaTaskRepository';

@singleton()
export class UpdateTaskService {
  constructor(private TaskRepository: PrismaTaskRepository) {}

  async execute(params: UpdateTaskDTO): Promise<void> {
    await this.TaskRepository.updateTask(params);
  }
}
