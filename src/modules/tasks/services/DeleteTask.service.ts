import { AppError } from 'infra/http/errors/AppError';
import { singleton } from 'tsyringe';
import { DeleteTaskDTO } from '../dtos/DeleteTask.dto';
import { PrismaTaskRepository } from '../repositories/prisma/PrismaTaskRepository';

@singleton()
export class DeleteTaskService {
  constructor(private taskRepository: PrismaTaskRepository) {}

  async execute({ id }: DeleteTaskDTO): Promise<void> {
    if (!(await this.taskRepository.taskExists(id))) {
      throw new AppError('Essa task não existe');
    }

    await this.taskRepository.deleteTask(id);
  }
}
