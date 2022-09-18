import { Quarter } from '@prisma/client';
import { AppError } from 'infra/http/errors/AppError';
import { PrismaAcademicYearRepository } from 'modules/academicYears/repositories/prisma/PrismaAcademicYearRepository';
import { singleton } from 'tsyringe';
import { GetQuarterByAcademicYearIdDTO } from '../dtos/GetQuarterByAcademicYearId.dto';
import { PrismaQuarterRepository } from '../repositories/prisma/PrismaQuarterRepository';

@singleton()
export class GetQuarterByAcademicYearIdService {
  constructor(private academicYearRepository: PrismaAcademicYearRepository, private quarterRepository: PrismaQuarterRepository) {}

  async execute(params: GetQuarterByAcademicYearIdDTO): Promise<Quarter[]> {
    if (!(await this.academicYearRepository.exists(params.academicYearId))) {
      throw new AppError('Ano acadêmico não existe');
    }

    const quarters = await this.quarterRepository.getQuarterByAcademicYearId(params.academicYearId);

    return quarters;
  }
}
