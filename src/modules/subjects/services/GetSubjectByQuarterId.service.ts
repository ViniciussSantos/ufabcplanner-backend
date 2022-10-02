import { Subject } from '@prisma/client';
import { AppError } from 'infra/http/errors/AppError';
import { QuarterRepository } from 'modules/quarters/repositories/QuarterRepository';
import { singleton } from 'tsyringe';
import { GetSubjectByQuarterIdDTO } from '../dtos/GetSubjectByQuarterId.dto';
import { SubjectRepository } from '../repositories/SubjectRepository';

@singleton()
export class GetSubjectByQuarterIdService {
  constructor(private quarterRepository: QuarterRepository, private subjectRepository: SubjectRepository) {}

  async execute(params: GetSubjectByQuarterIdDTO): Promise<Subject[]> {
    if (!(await this.quarterRepository.quarterExists(params.quarterId))) {
      throw new AppError('Quadrimestre não existe');
    }

    return this.subjectRepository.getByQuarterId(params.quarterId);
  }
}
