import { Quarter } from '@prisma/client';
import { ObjectNotFoundError } from 'infra/http/errors/ObjectNotFoundError';
import { AcademicYearRepository } from 'modules/academicYears/repositories/AcademicYearRepository';
import { singleton } from 'tsyringe';
import { GetQuarterByAcademicYearIdDTO } from '../dtos/GetQuarterByAcademicYearId.dto';
import { QuarterRepository } from '../repositories/QuarterRepository';

@singleton()
export class GetQuarterByAcademicYearIdService {
  constructor(private academicYearRepository: AcademicYearRepository, private quarterRepository: QuarterRepository) {}

  async execute(params: GetQuarterByAcademicYearIdDTO): Promise<Quarter[]> {
    if (!(await this.academicYearRepository.exists(params.academicYearId))) {
      throw new ObjectNotFoundError('Ano acadêmico', params.academicYearId);
    }

    const quarters = await this.quarterRepository.getQuarterByAcademicYearId(params.academicYearId);

    return quarters;
  }
}
