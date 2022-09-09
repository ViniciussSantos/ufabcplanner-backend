import { AppError } from 'infra/http/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { DeleteTaskDTO } from '../dtos/DeleteTask.dto';
import { ITaskRepository } from '../repositories/ITaskRepository';

@injectable()
export class DeleteTaskService {
  constructor(
    @inject('PrismaTaskRepository')
    private TaskRepository: ITaskRepository
  ) {}

  async handle({ id }: DeleteTaskDTO): Promise<void> {
    if (!(await this.TaskRepository.taskExists(id))) {
      throw new AppError('Essa task não existe');
    }

    await this.TaskRepository.deleteTask(id);
  }
}
