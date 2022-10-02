import { singleton } from 'tsyringe';
import { UpdateTaskDTO } from '../dtos/UpdateTask.dto';
import { TaskRepository } from '../repositories/TaskRepository';

@singleton()
export class UpdateTaskService {
  constructor(private taskRepository: TaskRepository) {}

  async execute(params: UpdateTaskDTO): Promise<void> {
    await this.taskRepository.update(params);
  }
}
