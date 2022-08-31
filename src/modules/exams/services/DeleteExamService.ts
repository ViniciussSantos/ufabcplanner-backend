import { injectable, inject } from 'tsyringe';
import { DeleteExamDTO } from '../dtos/DeleteExam.dto';
import { IExamRepository } from '../repositories/IExamRepository';

@injectable()
export class DeleteExamService {
  constructor(
    @inject('PrismaExamRepository')
    private ExamRepository: IExamRepository
  ) {}

  async handle({ id }: DeleteExamDTO): Promise<void> {
    await this.ExamRepository.deleteExam(id);
  }
}
