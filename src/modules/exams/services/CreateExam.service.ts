import { singleton } from 'tsyringe';
import { CreateExamDTO } from '../dtos/CreateExam.dto';
import { ExamRepository } from '../repositories/ExamRepository';

@singleton()
export class CreateExamService {
  constructor(private examRepository: ExamRepository) {}

  async execute(params: CreateExamDTO): Promise<void> {
    await this.examRepository.create(params);
  }
}
