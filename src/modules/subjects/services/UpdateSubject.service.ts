import { AppError } from 'infra/http/errors/AppError';
import { singleton } from 'tsyringe';
import { UpdateSubjectDTO } from '../dtos/UpdateSubject.dto';
import { SubjectRepository } from '../repositories/SubjectRepository';

@singleton()
export class UpdateSubjectService {
  constructor(private subjectRepository: SubjectRepository) {}

  async execute(params: UpdateSubjectDTO): Promise<void> {
    if (!(await this.subjectRepository.exists(params.id))) {
      throw new AppError('A matéria não existe');
    }

    await this.subjectRepository.update(params);
  }
}
