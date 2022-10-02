import { singleton } from 'tsyringe';
import { CreateTaskDTO } from '../dtos/CreateTask.dto';
import { TaskRepository } from '../repositories/TaskRepository';

@singleton()
export class CreateTaskService {
  constructor(private taskRepository: TaskRepository) {}

  async execute(params: CreateTaskDTO): Promise<void> {
    await this.taskRepository.create(params);
  }
}
