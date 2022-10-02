import { AppError } from 'infra/http/errors/AppError';
import { singleton } from 'tsyringe';
import { DeleteTaskDTO } from '../dtos/DeleteTask.dto';
import { TaskRepository } from '../repositories/TaskRepository';

@singleton()
export class DeleteTaskService {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ id }: DeleteTaskDTO): Promise<void> {
    if (!(await this.taskRepository.exists(id))) {
      throw new AppError('Essa task não existe');
    }

    await this.taskRepository.delete(id);
  }
}
