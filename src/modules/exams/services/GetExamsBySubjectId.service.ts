import { Exam } from '@prisma/client';
import { GetTasksBySubjectIdDTO } from 'modules/tasks/dtos/GetTasksBySubjecId.dto';
import { singleton } from 'tsyringe';
import { PrismaExamRepository } from '../repositories/prisma/PrismaExamRepository';

@singleton()
export class GetExamsBySubjectIdService {
  constructor(private examRepository: PrismaExamRepository) {}

  execute({ id }: GetTasksBySubjectIdDTO): Promise<Exam[]> {
    return this.examRepository.getExamsBySubjectId(id);
  }
}
