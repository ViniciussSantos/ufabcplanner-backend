import { ObjectNotFoundError } from 'infra/http/errors/ObjectNotFoundError';
import { singleton } from 'tsyringe';
import { DeleteExamDTO } from '../dtos/DeleteExam.dto';
import { ExamRepository } from '../repositories/ExamRepository';

@singleton()
export class DeleteExamService {
  constructor(private examRepository: ExamRepository) {}

  async execute({ id }: DeleteExamDTO): Promise<void> {
    if (!(await this.examRepository.exists(id))) {
      throw new ObjectNotFoundError('prova', id);
    }

    await this.examRepository.delete(id);
  }
}
