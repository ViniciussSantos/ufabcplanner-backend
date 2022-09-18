import { Class } from '@prisma/client';
import { AppError } from 'infra/http/errors/AppError';
import { PrismaSubjectRepository } from 'modules/subjects/repositories/prisma/PrismaSubjectRepository';
import { singleton } from 'tsyringe';
import { GetClassesBySubjectIdDTO } from '../dtos/GetClassesBySubjectId.dto';
import { PrismaClassRepository } from '../repositories/prisma/PrismaClassRepository';

@singleton()
export class GetClassesBySubjectIdService {
  constructor(private classRepository: PrismaClassRepository, private subjectRepository: PrismaSubjectRepository) {}

  async execute({ id }: GetClassesBySubjectIdDTO): Promise<Class[]> {
    if (!(await this.subjectRepository.subjectExists(id))) {
      throw new AppError('A matéria não existe');
    }

    return this.classRepository.getClassesBySubjectId(id);
  }
}
