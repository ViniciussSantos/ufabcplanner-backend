import { AcademicYear } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { IAcademicYearRepository } from '../repositories/IAcademicYearRepository';

@injectable()
export class GetAcademicYearByUserIdService {
  constructor(
    @inject('PrismaAcademicYearRepository')
    private academicYearRepository: IAcademicYearRepository,
  ) {}

  async execute(userId: string): Promise<Partial<AcademicYear>[]> {
    const academicYears = await this.academicYearRepository.getByUserId(userId);

    return academicYears.map(value => ({
      id: value.id,
      year: value.year,
      startDate: value.start_date.toISOString().split('T')[0],
      endDate: value.end_date.toISOString().split('T')[0],
    }));
  }
}
