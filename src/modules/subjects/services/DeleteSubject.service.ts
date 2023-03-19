import { ObjectNotFoundError } from 'infra/http/errors/ObjectNotFoundError';
import { singleton } from 'tsyringe';
import { DeleteSubjectDTO } from '../dtos/DeleteSubject.dto';
import { SubjectRepository } from '../repositories/SubjectRepository';

@singleton()
export class DeleteSubjectService {
  constructor(private subjectRepository: SubjectRepository) {}

  async execute(params: DeleteSubjectDTO): Promise<void> {
    if (!(await this.subjectRepository.exists(params.id))) {
      throw new ObjectNotFoundError('matéria', params.id);
    }

    await this.subjectRepository.delete(params.id);
  }
}
