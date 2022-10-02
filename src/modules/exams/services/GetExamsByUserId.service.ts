import { Exam } from '@prisma/client';
import { singleton } from 'tsyringe';
import { GetExamsByUserIdDTO } from '../dtos/GetExamsByUserId.dto';
import { ExamRepository } from '../repositories/ExamRepository';

@singleton()
export class GetExamsByUserIdService {
  constructor(private examRepository: ExamRepository) {}

  execute({ id }: GetExamsByUserIdDTO): Promise<Exam[]> {
    return this.examRepository.getByUserId(id);
  }
}
