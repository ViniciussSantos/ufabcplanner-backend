import { singleton } from 'tsyringe';
import { DeleteExamDTO } from '../dtos/DeleteExam.dto';
import { PrismaExamRepository } from '../repositories/prisma/PrismaExamRepository';

@singleton()
export class DeleteExamService {
  constructor(private examRepository: PrismaExamRepository) {}

  async execute({ id }: DeleteExamDTO): Promise<void> {
    await this.examRepository.deleteExam(id);
  }
}
