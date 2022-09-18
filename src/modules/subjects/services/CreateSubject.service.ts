import { AppError } from 'infra/http/errors/AppError';
import { PrismaQuarterRepository } from 'modules/quarters/repositories/prisma/PrismaQuarterRepository';
import { singleton } from 'tsyringe';
import { CreateSubjectDTO } from '../dtos/CreateSubject.dto';
import { PrismaSubjectRepository } from '../repositories/prisma/PrismaSubjectRepository';

@singleton()
export class CreateSubjectService {
  constructor(private quarterRepository: PrismaQuarterRepository, private subjectRepository: PrismaSubjectRepository) {}

  async execute(params: CreateSubjectDTO): Promise<void> {
    if (!(await this.quarterRepository.quarterExists(params.quarterId))) {
      throw new AppError('Quadrimestre não existe');
    }

    await this.subjectRepository.createSubject(params);
  }
}
