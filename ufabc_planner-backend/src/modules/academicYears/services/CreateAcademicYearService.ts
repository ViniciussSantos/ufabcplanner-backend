import { CreateUserService } from 'modules/users/services/CreateUserService';
import { DateProvider } from 'providers/dateProvider';
import { injectable } from 'tsyringe';
import { AppError } from 'utils/errors/AppError';
import { prisma } from 'utils/prisma';

@injectable()
export class CreateAcademicYearService {
  constructor(private readonly dateProvider: DateProvider) {}

  async execute(params: CreateAcademyYearDTO): Promise<void> {
    const { id, year, startDate, endDate } = params;

    const startDateUTC = this.dateProvider.toDate(startDate);
    const endDateUTC = this.dateProvider.toDate(endDate);

    if (this.dateProvider.compareIfBefore(startDateUTC, endDateUTC)) {
      throw new AppError('Data final é antes da data inicial');
    }

    await prisma.academicYear.create({
      data: {
        userId: id,
        year: year,
        start_date: startDateUTC,
        end_date: endDateUTC,
      },
    });
  }
}
