import { singleton } from 'tsyringe';
import { AppError } from 'infra/http/errors/AppError';
import { CreateAcademyYearDTO } from '../dtos/CreateAcademyYear.dto';

import { PrismaAcademicYearRepository } from '../repositories/prisma/PrismaAcademicYearRepository';
import { DayjsDateProvider } from 'infra/services/DayjsDateProvider';

@singleton()
export class CreateAcademicYearService {
  constructor(private academicYearRepository: PrismaAcademicYearRepository, private dateProvider: DayjsDateProvider) {}

  async execute(params: CreateAcademyYearDTO): Promise<void> {
    const { userId, year, startDate, endDate } = params;

    const startDateUTC = this.dateProvider.toDate(startDate);
    const endDateUTC = this.dateProvider.toDate(endDate);

    if (this.dateProvider.compareIfBefore(startDateUTC, endDateUTC)) {
      throw new AppError('Data final é antes da data inicial');
    }

    await this.academicYearRepository.create({
      userId,
      year,
      start_date: startDateUTC,
      end_date: endDateUTC,
    });
  }
}
