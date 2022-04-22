import { IDateProvider } from 'infra/container/providers/DateProvider/IDateProvider';
import { AppError } from 'infra/http/errors/AppError';
import { IAcademicYearRepository } from 'modules/academicYears/repositories/IAcademicYearRepository';
import { inject, injectable } from 'tsyringe';
import { createQuarterDTO } from '../dtos/CreateQuarterDTO';
import { IQuarterRepository } from '../repositories/IQuarterRepository';

@injectable()
export class CreateQuarterService {
  constructor(
    @inject('PrismaQuarterRepository')
    private QuarterRepository: IQuarterRepository,
    @inject('PrismaAcademicYearRepository')
    private academicYearRepository: IAcademicYearRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}
  async execute(params: createQuarterDTO) {
    const { academicYearId, startDate, endDate } = params;
    const startDateUTC = this.dateProvider.toDate(startDate);
    const endDateUTC = this.dateProvider.toDate(endDate);

    if (!(await this.academicYearRepository.exists(academicYearId))) {
      throw new AppError('Ano acadêmico não existe');
    }

    if (this.dateProvider.compareIfBefore(startDateUTC, endDateUTC)) {
      throw new AppError('Data final é antes da data inicial');
    }

    await this.QuarterRepository.createQuarter({
      academyYearId: academicYearId,
      startDate: startDateUTC,
      endDate: endDateUTC,
    });
  }
}
