import { Task } from '@prisma/client';
import { singleton } from 'tsyringe';
import { GetTasksBySubjectIdDTO } from '../dtos/GetTasksBySubjecId.dto';
import { TaskRepository } from '../repositories/TaskRepository';

@singleton()
export class GetTasksBySubjectIdService {
  constructor(private taskRepository: TaskRepository) {}

  execute({ id }: GetTasksBySubjectIdDTO): Promise<Task[]> {
    return this.taskRepository.getBySubjectId(id);
  }
}
