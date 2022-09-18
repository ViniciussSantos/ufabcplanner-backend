import { singleton } from 'tsyringe';
import { UpdateExamDTO } from '../dtos/UpdateExam.dto';
import { PrismaExamRepository } from '../repositories/prisma/PrismaExamRepository';

@singleton()
export class UpdateExamService {
  constructor(private examRepository: PrismaExamRepository) {}

  async execute(params: UpdateExamDTO): Promise<void> {
    await this.examRepository.updateExam(params);
  }
}
