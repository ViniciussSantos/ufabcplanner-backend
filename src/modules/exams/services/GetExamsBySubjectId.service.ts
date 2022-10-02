import { Exam } from '@prisma/client';
import { GetTasksBySubjectIdDTO } from 'modules/tasks/dtos/GetTasksBySubjecId.dto';
import { singleton } from 'tsyringe';
import { ExamRepository } from '../repositories/ExamRepository';

@singleton()
export class GetExamsBySubjectIdService {
  constructor(private examRepository: ExamRepository) {}

  execute({ id }: GetTasksBySubjectIdDTO): Promise<Exam[]> {
    return this.examRepository.getBySubjectId(id);
  }
}
