import { AppError } from 'infra/http/errors/AppError';
import { singleton } from 'tsyringe';
import { DeleteSubjectDTO } from '../dtos/DeleteSubject.dto';
import { PrismaSubjectRepository } from '../repositories/prisma/PrismaSubjectRepository';

@singleton()
export class DeleteSubjectService {
  constructor(private subjectRepository: PrismaSubjectRepository) {}

  async execute(params: DeleteSubjectDTO): Promise<void> {
    if (!(await this.subjectRepository.subjectExists(params.id))) {
      throw new AppError('A matéria não existe');
    }

    await this.subjectRepository.deleteSubject(params.id);
  }
}
