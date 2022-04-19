import { AcademicYear } from '@prisma/client';
import { prisma } from 'infra/prisma/client';
import { inject, injectable } from 'tsyringe';
import { AppError } from 'infra/http/errors/AppError';
import { UpdateAcademyYearDTO } from '../dtos/UpdateAcademicYearDTO';
import { IDateProvider } from 'infra/container/providers/DateProvider/IDateProvider';
import { IAcademicYearRepository } from '../repositories/IAcademicYearRepository';

@injectable()
export class UpdateAcademicYearService {
  constructor(
    @inject('PrismaAcademicYearRepository')
    private academicYearRepository: IAcademicYearRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(params: UpdateAcademyYearDTO): Promise<void> {
    const { id, year, startDate, endDate } = params;

    if (!(await this.academicYearRepository.exists(id))) {
      throw new AppError('Este ano acadêmico não existe!');
    }

    const startDateUTC = this.dateProvider.toDate(startDate);
    const endDateUTC = this.dateProvider.toDate(endDate);

    if (this.dateProvider.compareIfBefore(startDateUTC, endDateUTC)) {
      throw new AppError('Data final é antes da data inicial');
    }

    await this.academicYearRepository.update({
      id: id,
      year: year,
      startDate: startDateUTC,
      endDate: endDateUTC,
    });
  }
}
