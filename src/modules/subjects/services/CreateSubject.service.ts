import { AppError } from 'infra/http/errors/AppError';
import { QuarterRepository } from 'modules/quarters/repositories/QuarterRepository';
import { singleton } from 'tsyringe';
import { CreateSubjectDTO } from '../dtos/CreateSubject.dto';
import { SubjectRepository } from '../repositories/SubjectRepository';

@singleton()
export class CreateSubjectService {
  constructor(private quarterRepository: QuarterRepository, private subjectRepository: SubjectRepository) {}

  async execute(params: CreateSubjectDTO): Promise<void> {
    if (!(await this.quarterRepository.quarterExists(params.quarterId))) {
      throw new AppError('Quadrimestre não existe');
    }

    await this.subjectRepository.create(params);
  }
}
