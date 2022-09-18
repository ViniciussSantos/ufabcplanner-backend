import { singleton } from 'tsyringe';
import { AppError } from 'infra/http/errors/AppError';
import { UpdateAcademyYearDTO } from '../dtos/UpdateAcademicYear.dto';
import { PrismaAcademicYearRepository } from '../repositories/prisma/PrismaAcademicYearRepository';
import { DayjsDateProvider } from 'infra/services/DayjsDateProvider';

@singleton()
export class UpdateAcademicYearService {
  constructor(private academicYearRepository: PrismaAcademicYearRepository, private dateProvider: DayjsDateProvider) {}

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
      id,
      year,
      startDate: startDateUTC,
      endDate: endDateUTC,
    });
  }
}
