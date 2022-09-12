import { injectable, inject } from 'tsyringe';
import { UpdateExamDTO } from '../dtos/UpdateExam.dto';
import { IExamRepository } from '../repositories/IExamRepository';

@injectable()
export class UpdateExamService {
  constructor(
    @inject('PrismaExamRepository')
    private examRepository: IExamRepository,
  ) {}

  async handle(params: UpdateExamDTO): Promise<void> {
    await this.examRepository.updateExam(params);
  }
}
