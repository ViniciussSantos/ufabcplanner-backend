import { inject, injectable } from 'tsyringe';
import { UpdateTaskDTO } from '../dtos/UpdateTask.dto';
import { ITaskRepository } from '../repositories/ITaskRepository';

@injectable()
export class UpdateTaskService {
  constructor(
    @inject('PrismaTaskRepository')
    private TaskRepository: ITaskRepository
  ) {}

  async handle(params: UpdateTaskDTO): Promise<void> {
    await this.TaskRepository.updateTask(params);
  }
}
