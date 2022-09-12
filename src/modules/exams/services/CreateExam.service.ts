import { injectable, inject } from 'tsyringe';
import { CreateExamDTO } from '../dtos/CreateExam.dto';
import { IExamRepository } from '../repositories/IExamRepository';

@injectable()
export class CreateExamService {
  constructor(
    @inject('PrismaExamRepository')
    private ExamRepository: IExamRepository,
  ) {}

  async handle(params: CreateExamDTO): Promise<void> {
    await this.ExamRepository.createExam(params);
  }
}
