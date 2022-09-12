import { Subject } from '@prisma/client';
import { AppError } from 'infra/http/errors/AppError';
import { IQuarterRepository } from 'modules/quarters/repositories/IQuarterRepository';
import { inject, injectable } from 'tsyringe';
import { GetSubjectByQuarterIdDTO } from '../dtos/GetSubjectByQuarterId.dto';
import { ISubjectRepository } from '../repositories/ISubjectRepository';

@injectable()
export class GetSubjectByQuarterIdService {
  constructor(
    @inject('PrismaQuarterRepository')
    private QuarterRepository: IQuarterRepository,
    @inject('PrismaSubjectRepository')
    private subjectRepository: ISubjectRepository,
  ) {}

  async execute(params: GetSubjectByQuarterIdDTO): Promise<Subject[]> {
    if (!(await this.QuarterRepository.quarterExists(params.quarterId))) {
      throw new AppError('Quadrimestre não existe');
    }

    return this.subjectRepository.getSubjectByQuarterId(params.quarterId);
  }
}
