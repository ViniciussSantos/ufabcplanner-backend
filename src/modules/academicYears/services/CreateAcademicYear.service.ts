import { singleton } from 'tsyringe';
import { CreateAcademyYearDTO } from '../dtos/CreateAcademyYear.dto';
import { AcademicYearRepository } from '../repositories/AcademicYearRepository';
import { DateService } from 'infra/services/DateService';
import { BusinessLogicError } from 'infra/http/errors/BusinessLogicError';

@singleton()
export class CreateAcademicYearService {
  constructor(private academicYearRepository: AcademicYearRepository, private dateService: DateService) {}

  async execute(params: CreateAcademyYearDTO): Promise<void> {
    const { userId, year, startDate, endDate } = params;

    const startDateUTC = this.dateService.toDate(startDate);
    const endDateUTC = this.dateService.toDate(endDate);

    if (this.dateService.compareIfBefore(startDateUTC, endDateUTC)) {
      throw new BusinessLogicError('Data final é antes da data inicial');
    }

    await this.academicYearRepository.create({
      userId,
      year,
      startDate: startDateUTC,
      endDate: endDateUTC,
    });
  }
}
