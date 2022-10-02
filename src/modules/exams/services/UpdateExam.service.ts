import { singleton } from 'tsyringe';
import { UpdateExamDTO } from '../dtos/UpdateExam.dto';
import { ExamRepository } from '../repositories/ExamRepository';

@singleton()
export class UpdateExamService {
  constructor(private examRepository: ExamRepository) {}

  async execute(params: UpdateExamDTO): Promise<void> {
    await this.examRepository.update(params);
  }
}
