import { AppError } from 'infra/http/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { DeleteSubjectDTO } from '../dtos/DeleteSubject.dto';
import { ISubjectRepository } from '../repositories/ISubjectRepository';

@injectable()
export class DeleteSubjectService {
  constructor(
    @inject('PrismaSubjectRepository')
    private subjectRepository: ISubjectRepository,
  ) {}

  async execute(params: DeleteSubjectDTO): Promise<void> {
    if (!(await this.subjectRepository.subjectExists(params.id))) {
      throw new AppError('A matéria não existe');
    }

    await this.subjectRepository.deleteSubject(params.id);
  }
}
