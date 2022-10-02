import { singleton } from 'tsyringe';
import { AppError } from 'infra/http/errors/AppError';
import { CreateAcademyYearDTO } from '../dtos/CreateAcademyYear.dto';
import { AcademicYearRepository } from '../repositories/AcademicYearRepository';
import { DateService } from 'infra/services/DateService';

@singleton()
export class CreateAcademicYearService {
  constructor(private academicYearRepository: AcademicYearRepository, private dateService: DateService) {}

  async execute(params: CreateAcademyYearDTO): Promise<void> {
    const { userId, year, startDate, endDate } = params;

    const startDateUTC = this.dateService.toDate(startDate);
    const endDateUTC = this.dateService.toDate(endDate);

    if (this.dateService.compareIfBefore(startDateUTC, endDateUTC)) {
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
