import { AppError } from 'infra/http/errors/AppError';
import { DateService } from 'infra/services/DateService';
import { createQuarterDTO } from '../dtos/CreateQuarter.dto.';
import { QuarterRepository } from '../repositories/QuarterRepository';
import { singleton } from 'tsyringe';
import { AcademicYearRepository } from 'modules/academicYears/repositories/AcademicYearRepository';

@singleton()
export class CreateQuarterService {
  constructor(
    private quarterRepository: QuarterRepository,
    private academicYearRepository: AcademicYearRepository,
    private dateService: DateService,
  ) {}

  async execute(params: createQuarterDTO) {
    const { academicYearId, startDate, endDate } = params;
    const startDateUTC = this.dateService.toDate(startDate);
    const endDateUTC = this.dateService.toDate(endDate);

    if (!(await this.academicYearRepository.exists(academicYearId))) {
      throw new AppError('Ano acadêmico não existe');
    }

    if (this.dateService.compareIfBefore(startDateUTC, endDateUTC)) {
      throw new AppError('Data final é antes da data inicial');
    }

    await this.quarterRepository.createQuarter({
      academyYearId: academicYearId,
      startDate: startDateUTC,
      endDate: endDateUTC,
    });
  }
}
