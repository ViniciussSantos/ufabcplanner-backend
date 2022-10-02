import { singleton } from 'tsyringe';
import { DeleteExamDTO } from '../dtos/DeleteExam.dto';
import { ExamRepository } from '../repositories/ExamRepository';

@singleton()
export class DeleteExamService {
  constructor(private examRepository: ExamRepository) {}

  async execute({ id }: DeleteExamDTO): Promise<void> {
    await this.examRepository.delete(id);
  }
}
