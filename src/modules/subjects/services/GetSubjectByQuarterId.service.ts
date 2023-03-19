import { Subject } from '@prisma/client';
import { ObjectNotFoundError } from 'infra/http/errors/ObjectNotFoundError';
import { QuarterRepository } from 'modules/quarters/repositories/QuarterRepository';
import { singleton } from 'tsyringe';
import { GetSubjectByQuarterIdDTO } from '../dtos/GetSubjectByQuarterId.dto';
import { SubjectRepository } from '../repositories/SubjectRepository';

@singleton()
export class GetSubjectByQuarterIdService {
  constructor(private quarterRepository: QuarterRepository, private subjectRepository: SubjectRepository) {}

  async execute(params: GetSubjectByQuarterIdDTO): Promise<Subject[]> {
    if (!(await this.quarterRepository.quarterExists(params.quarterId))) {
      throw new ObjectNotFoundError('Quadrimestre', params.quarterId);
    }

    return this.subjectRepository.getByQuarterId(params.quarterId);
  }
}
