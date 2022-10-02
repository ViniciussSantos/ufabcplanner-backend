import { Class } from '@prisma/client';
import { AppError } from 'infra/http/errors/AppError';
import { SubjectRepository } from 'modules/subjects/repositories/SubjectRepository';
import { singleton } from 'tsyringe';
import { GetClassesBySubjectIdDTO } from '../dtos/GetClassesBySubjectId.dto';
import { ClassRepository } from '../repositories/ClassRepository';

@singleton()
export class GetClassesBySubjectIdService {
  constructor(private classRepository: ClassRepository, private subjectRepository: SubjectRepository) {}

  async execute({ id }: GetClassesBySubjectIdDTO): Promise<Class[]> {
    if (!(await this.subjectRepository.exists(id))) {
      throw new AppError('A matéria não existe');
    }

    return this.classRepository.getBySubjectId(id);
  }
}
