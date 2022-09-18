import { Task } from '@prisma/client';
import { singleton } from 'tsyringe';
import { GetTasksBySubjectIdDTO } from '../dtos/GetTasksBySubjecId.dto';
import { PrismaTaskRepository } from '../repositories/prisma/PrismaTaskRepository';

@singleton()
export class GetTasksBySubjectIdService {
  constructor(private taskRepository: PrismaTaskRepository) {}

  execute({ id }: GetTasksBySubjectIdDTO): Promise<Task[]> {
    return this.taskRepository.getTasksBySubjectId(id);
  }
}
