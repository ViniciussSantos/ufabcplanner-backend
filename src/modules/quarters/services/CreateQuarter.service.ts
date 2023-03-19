import { DateService } from 'infra/services/DateService';
import { createQuarterDTO } from '../dtos/CreateQuarter.dto.';
import { QuarterRepository } from '../repositories/QuarterRepository';
import { singleton } from 'tsyringe';
import { AcademicYearRepository } from 'modules/academicYears/repositories/AcademicYearRepository';
import { ObjectNotFoundError } from 'infra/http/errors/ObjectNotFoundError';
import { BusinessLogicError } from 'infra/http/errors/BusinessLogicError';

@singleton()
export class CreateQuarterService {
  constructor(
    private quarterRepository: QuarterRepository,
    private academicYearRepository: AcademicYearRepository,
    private dateService: DateService,
  ) {}

  async execute(params: createQuarterDTO) {
    const { academicYearId, userId, startDate, endDate } = params;
    const startDateUTC = this.dateService.toDate(startDate);
    const endDateUTC = this.dateService.toDate(endDate);

    if (!(await this.academicYearRepository.exists(academicYearId))) {
      throw new ObjectNotFoundError('ano acadêmico', academicYearId);
    }

    if (this.dateService.compareIfBefore(startDateUTC, endDateUTC)) {
      throw new BusinessLogicError('Data final é antes da data inicial');
    }

    await this.quarterRepository.createQuarter({
      academyYearId: academicYearId,
      userId,
      startDate: startDateUTC,
      endDate: endDateUTC,
    });
  }
}
