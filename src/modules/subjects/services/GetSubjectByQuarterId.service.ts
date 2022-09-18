import { Subject } from '@prisma/client';
import { AppError } from 'infra/http/errors/AppError';
import { PrismaQuarterRepository } from 'modules/quarters/repositories/prisma/PrismaQuarterRepository';
import { singleton } from 'tsyringe';
import { GetSubjectByQuarterIdDTO } from '../dtos/GetSubjectByQuarterId.dto';
import { PrismaSubjectRepository } from '../repositories/prisma/PrismaSubjectRepository';

@singleton()
export class GetSubjectByQuarterIdService {
  constructor(private quarterRepository: PrismaQuarterRepository, private subjectRepository: PrismaSubjectRepository) {}

  async execute(params: GetSubjectByQuarterIdDTO): Promise<Subject[]> {
    if (!(await this.quarterRepository.quarterExists(params.quarterId))) {
      throw new AppError('Quadrimestre não existe');
    }

    return this.subjectRepository.getSubjectByQuarterId(params.quarterId);
  }
}
