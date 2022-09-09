import { Task } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { GetTasksBySubjectIdDTO } from '../dtos/GetTasksBySubjecId.dto';
import { ITaskRepository } from '../repositories/ITaskRepository';

@injectable()
export class GetTasksBySubjectIdService {
  constructor(
    @inject('PrismaTaskRepository')
    private TaskRepository: ITaskRepository
  ) {}

  handle({ id }: GetTasksBySubjectIdDTO): Promise<Task[]> {
    return this.TaskRepository.getTasksBySubjectId(id);
  }
}
