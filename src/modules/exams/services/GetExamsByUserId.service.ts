import { Exam } from '@prisma/client';
import { singleton } from 'tsyringe';
import { GetExamsByUserIdDTO } from '../dtos/GetExamsByUserId.dto';
import { PrismaExamRepository } from '../repositories/prisma/PrismaExamRepository';

@singleton()
export class GetExamsByUserIdService {
  constructor(private examRepository: PrismaExamRepository) {}

  execute({ id }: GetExamsByUserIdDTO): Promise<Exam[]> {
    return this.examRepository.getExamsByUserId(id);
  }
}
