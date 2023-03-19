import { ObjectNotFoundError } from 'infra/http/errors/ObjectNotFoundError';
import { singleton } from 'tsyringe';
import { DeleteTaskDTO } from '../dtos/DeleteTask.dto';
import { TaskRepository } from '../repositories/TaskRepository';

@singleton()
export class DeleteTaskService {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ id }: DeleteTaskDTO): Promise<void> {
    if (!(await this.taskRepository.exists(id))) {
      throw new ObjectNotFoundError('tarefa', id);
    }

    await this.taskRepository.delete(id);
  }
}
