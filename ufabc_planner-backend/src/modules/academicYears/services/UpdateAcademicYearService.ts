import { AcademicYear } from '@prisma/client';
import { DateProvider } from 'providers/dateProvider';
import { injectable } from 'tsyringe';
import { AppError } from 'utils/errors/AppError';
import { prisma } from 'utils/prisma';
import { UpdateAcademyYearDTO } from '../dtos/UpdateAcademicYearDTO';

@injectable()
export class UpdateAcademicYearService {
  constructor(private readonly dateProvider: DateProvider) {}

  checkDates(originalAcademicYear: AcademicYear, validParams: Omit<UpdateAcademyYearDTO, 'id'>): void {
    if (validParams.start_date) {
      if (
        this.dateProvider.compareIfBefore(
          this.dateProvider.toDate(validParams.start_date),
          originalAcademicYear.end_date
        )
      ) {
        throw new AppError('Data final é antes da data inicial');
      }
    }

    if (validParams.end_date) {
      if (
        this.dateProvider.compareIfBefore(
          originalAcademicYear.start_date,
          this.dateProvider.toDate(validParams.end_date)
        )
      ) {
        throw new AppError('Data final é antes da data inicial');
      }
    }
  }

  async execute(params: UpdateAcademyYearDTO): Promise<void> {
    const originalAcademicYear = await prisma.academicYear.findUnique({ where: { id: params.id } });

    if (!originalAcademicYear) {
      throw new AppError('Este ano acadêmico não existe!');
    }

    this.checkDates(originalAcademicYear, params);

    await prisma.academicYear.update({
      where: { id: params.id },
      data: {
        year: params.year,
        start_date: params.start_date,
        end_date: params.end_date,
      },
    });
  }
}
