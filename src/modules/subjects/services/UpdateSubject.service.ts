import { ObjectNotFoundError } from 'infra/http/errors/ObjectNotFoundError';
import { singleton } from 'tsyringe';
import { UpdateSubjectDTO } from '../dtos/UpdateSubject.dto';
import { SubjectRepository } from '../repositories/SubjectRepository';

@singleton()
export class UpdateSubjectService {
  constructor(private subjectRepository: SubjectRepository) {}

  async execute(params: UpdateSubjectDTO): Promise<void> {
    if (!(await this.subjectRepository.exists(params.id))) {
      throw new ObjectNotFoundError('matéria', params.id);
    }

    await this.subjectRepository.update(params);
  }
}
