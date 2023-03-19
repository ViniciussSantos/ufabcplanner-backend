import { Class } from '@prisma/client';
import { ObjectNotFoundError } from 'infra/http/errors/ObjectNotFoundError';
import { SubjectRepository } from 'modules/subjects/repositories/SubjectRepository';
import { singleton } from 'tsyringe';
import { GetClassesBySubjectIdDTO } from '../dtos/GetClassesBySubjectId.dto';
import { ClassRepository } from '../repositories/ClassRepository';

@singleton()
export class GetClassesBySubjectIdService {
  constructor(private classRepository: ClassRepository, private subjectRepository: SubjectRepository) {}

  async execute({ id }: GetClassesBySubjectIdDTO): Promise<Class[]> {
    if (!(await this.subjectRepository.exists(id))) {
      throw new ObjectNotFoundError('matéria', id);
    }

    return this.classRepository.getBySubjectId(id);
  }
}
