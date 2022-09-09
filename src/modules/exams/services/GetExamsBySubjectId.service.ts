import { Exam } from '@prisma/client';
import { GetTasksBySubjectIdDTO } from 'modules/tasks/dtos/GetTasksBySubjecId.dto';
import { injectable, inject } from 'tsyringe';
import { IExamRepository } from '../repositories/IExamRepository';

@injectable()
export class GetExamsBySubjectIdService {
  constructor(
    @inject('PrismaExamRepository')
    private ExamRepository: IExamRepository
  ) {}

  async handle({ id }: GetTasksBySubjectIdDTO): Promise<Exam[]> {
    return this.ExamRepository.getExamsBySubjectId(id);
  }
}
