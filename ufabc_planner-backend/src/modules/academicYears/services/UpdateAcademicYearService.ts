import { AcademicYear } from '@prisma/client';
import { DateProvider } from 'providers/dateProvider';
import { injectable } from 'tsyringe';
import { AppError } from 'utils/errors/AppError';
import { prisma } from 'utils/prisma';
import { UpdateAcademyYearDTO } from '../dtos/UpdateAcademicYearDTO';

@injectable()
export class UpdateAcademicYearService {
  constructor(private readonly dateProvider: DateProvider) {}

  async execute(params: UpdateAcademyYearDTO): Promise<void> {
    const { id, year, startDate, endDate } = params;
    const originalAcademicYear = await prisma.academicYear.findUnique({ where: { id: id } });

    if (!originalAcademicYear) {
      throw new AppError('Este ano acadêmico não existe!');
    }

    const startDateUTC = this.dateProvider.toDate(startDate);
    const endDateUTC = this.dateProvider.toDate(endDate);

    if (this.dateProvider.compareIfBefore(startDateUTC, endDateUTC)) {
      throw new AppError('Data final é antes da data inicial');
    }

    await prisma.academicYear.update({
      where: { id: id },
      data: {
        year: year,
        start_date: startDateUTC,
        end_date: endDateUTC,
      },
    });
  }
}
