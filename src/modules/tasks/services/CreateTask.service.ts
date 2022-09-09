import { inject, injectable } from 'tsyringe';
import { CreateTaskDTO } from '../dtos/CreateTask.dto';
import { ITaskRepository } from '../repositories/ITaskRepository';

@injectable()
export class CreateTaskService {
  constructor(
    @inject('PrismaTaskRepository')
    private TaskRepository: ITaskRepository
  ) {}

  async handle(params: CreateTaskDTO): Promise<void> {
    await this.TaskRepository.createTask(params);
  }
}
