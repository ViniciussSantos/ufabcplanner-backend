import { prisma } from 'infra/prisma/client';
import { inject, injectable } from 'tsyringe';
import { AppError } from 'infra/http/errors/AppError';
import { CreateAcademyYearDTO } from '../dtos/CreateAcademyYearDTO';
import { IDateProvider } from 'infra/container/providers/DateProvider/IDateProvider';
import { IAcademicYearRepository } from '../repositories/IAcademicYearRepository';

@injectable()
export class CreateAcademicYearService {
  constructor(
    @inject('PrismaAcademicYearRepository')
    private academicYearRepository: IAcademicYearRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(params: CreateAcademyYearDTO): Promise<void> {
    const { userId, year, startDate, endDate } = params;

    const startDateUTC = this.dateProvider.toDate(startDate);
    const endDateUTC = this.dateProvider.toDate(endDate);

    if (this.dateProvider.compareIfBefore(startDateUTC, endDateUTC)) {
      throw new AppError('Data final é antes da data inicial');
    }

    await this.academicYearRepository.create({
      userId: userId,
      year: year,
      start_date: startDateUTC,
      end_date: endDateUTC,
    });
  }
}
