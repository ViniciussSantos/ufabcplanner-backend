import { Exam } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import { GetExamsByUserIdDTO } from '../dtos/GetExamsByUserId.dto';
import { IExamRepository } from '../repositories/IExamRepository';

@injectable()
export class GetExamsByUserIdService {
  constructor(
    @inject('PrismaExamRepository')
    private ExamRepository: IExamRepository
  ) {}

  async handle({ id }: GetExamsByUserIdDTO): Promise<Exam[]> {
    return this.ExamRepository.getExamsByUserId(id);
  }
}
