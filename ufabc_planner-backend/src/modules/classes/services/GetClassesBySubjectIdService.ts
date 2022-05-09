import { Class } from '@prisma/client';
import { AppError } from 'infra/http/errors/AppError';
import { ISubjectRepository } from 'modules/subjects/repositories/ISubjectRepository';
import { injectable, inject } from 'tsyringe';
import { GetClassesBySubjectIdDTO } from '../dtos/GetClassesBySubjectId.dto';
import { IClassRepository } from '../repositories/IClassRepository';

@injectable()
export class GetClassesBySubjectIdService {
  constructor(
    @inject('PrismaClassRepository')
    private ClassRepository: IClassRepository,
    @inject('PrismaSubjectRepository')
    private subjectRepository: ISubjectRepository
  ) {}

  async handle({ id }: GetClassesBySubjectIdDTO): Promise<Class[]> {
    if (!(await this.subjectRepository.subjectExists(id))) {
      throw new AppError('A matéria não existe');
    }

    return this.ClassRepository.getClassesBySubjectId(id);
  }
}
