import { AppError } from 'infra/http/errors/AppError';
import { singleton } from 'tsyringe';
import { UpdateSubjectDTO } from '../dtos/UpdateSubject.dto';
import { PrismaSubjectRepository } from '../repositories/prisma/PrismaSubjectRepository';

@singleton()
export class UpdateSubjectService {
  constructor(private subjectRepository: PrismaSubjectRepository) {}

  async execute(params: UpdateSubjectDTO): Promise<void> {
    if (!(await this.subjectRepository.subjectExists(params.id))) {
      throw new AppError('A matéria não existe');
    }

    await this.subjectRepository.updateSubject(params);
  }
}
