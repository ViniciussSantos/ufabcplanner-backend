import { Task } from '@prisma/client';
import { singleton } from 'tsyringe';
import { GetTasksByUserIdDTO } from '../dtos/GetTasksByUserId.dto';
import { TaskRepository } from '../repositories/TaskRepository';

@singleton()
export class GetTasksByUserIdService {
  constructor(private taskRepository: TaskRepository) {}

  execute({ id }: GetTasksByUserIdDTO): Promise<Task[]> {
    return this.taskRepository.getByUserId(id);
  }
}
