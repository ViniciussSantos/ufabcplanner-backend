import { AcademicYear } from '@prisma/client';
import { start } from 'repl';
import { inject, injectable } from 'tsyringe';
import { AppError } from 'infra/http/errors/AppError';
import { prisma } from 'infra/prisma/client';
import { IAcademicYearRepository } from '../repositories/IAcademicYearRepository';

@injectable()
export class GetAcademicYearByUserIdService {
  constructor(
    @inject('PrismaAcademicYearRepository')
    private academicYearRepository: IAcademicYearRepository
  ) {}

  async execute(userId: string): Promise<Partial<AcademicYear>[]> {
    const academicYears = await this.academicYearRepository.getByUserId(userId);

    return academicYears.map((value) => {
      return {
        id: value.id,
        year: value.year,
        startDate: value.start_date.toISOString().split('T')[0],
        endDate: value.end_date.toISOString().split('T')[0],
      };
    });
  }
}
