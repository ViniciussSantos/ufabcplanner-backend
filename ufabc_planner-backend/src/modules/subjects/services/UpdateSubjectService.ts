import { AppError } from 'infra/http/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { UpdateSubjectDTO } from '../dtos/UpdateSubject.dto';
import { ISubjectRepository } from '../repositories/ISubjectRepository';

@injectable()
export class UpdateSubjectService {
  constructor(
    @inject('PrismaSubjectRepository')
    private subjectRepository: ISubjectRepository
  ) {}
  async execute(params: UpdateSubjectDTO): Promise<void> {
    if (!(await this.subjectRepository.subjectExists(params.id))) {
      throw new AppError('A matéria não existe');
    }

    await this.subjectRepository.updateSubject(params);
  }
}
