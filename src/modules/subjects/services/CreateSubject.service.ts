import { AppError } from 'infra/http/errors/AppError';
import { IQuarterRepository } from 'modules/quarters/repositories/IQuarterRepository';
import { inject, injectable } from 'tsyringe';
import { CreateSubjectDTO } from '../dtos/CreateSubject.dto';
import { ISubjectRepository } from '../repositories/ISubjectRepository';

@injectable()
export class CreateSubjectService {
  constructor(
    @inject('PrismaQuarterRepository')
    private QuarterRepository: IQuarterRepository,
    @inject('PrismaSubjectRepository')
    private subjectRepository: ISubjectRepository
  ) {}

  async execute(params: CreateSubjectDTO): Promise<void> {
    if (!(await this.QuarterRepository.quarterExists(params.quarterId))) {
      throw new AppError('Quadrimestre não existe');
    }

    await this.subjectRepository.createSubject(params);
  }
}
