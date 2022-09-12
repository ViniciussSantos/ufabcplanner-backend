import { Task } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { GetTasksByUserIdDTO } from '../dtos/GetTasksByUserId.dto';
import { ITaskRepository } from '../repositories/ITaskRepository';

@injectable()
export class GetTasksByUserIdService {
  constructor(
    @inject('PrismaTaskRepository')
    private TaskRepository: ITaskRepository,
  ) {}

  handle({ id }: GetTasksByUserIdDTO): Promise<Task[]> {
    return this.TaskRepository.getTasksByUserId(id);
  }
}
