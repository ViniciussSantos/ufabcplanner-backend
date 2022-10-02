import { AppError } from 'infra/http/errors/AppError';
import { singleton } from 'tsyringe';
import { DeleteSubjectDTO } from '../dtos/DeleteSubject.dto';
import { SubjectRepository } from '../repositories/SubjectRepository';

@singleton()
export class DeleteSubjectService {
  constructor(private subjectRepository: SubjectRepository) {}

  async execute(params: DeleteSubjectDTO): Promise<void> {
    if (!(await this.subjectRepository.exists(params.id))) {
      throw new AppError('A matéria não existe');
    }

    await this.subjectRepository.delete(params.id);
  }
}
