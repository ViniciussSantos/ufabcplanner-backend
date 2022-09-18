import { singleton } from 'tsyringe';
import { CreateExamDTO } from '../dtos/CreateExam.dto';
import { PrismaExamRepository } from '../repositories/prisma/PrismaExamRepository';

@singleton()
export class CreateExamService {
  constructor(private examRepository: PrismaExamRepository) {}

  async execute(params: CreateExamDTO): Promise<void> {
    await this.examRepository.createExam(params);
  }
}
