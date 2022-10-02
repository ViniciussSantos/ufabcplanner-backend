import { singleton } from 'tsyringe';
import { AppError } from 'infra/http/errors/AppError';
import { UpdateAcademyYearDTO } from '../dtos/UpdateAcademicYear.dto';
import { AcademicYearRepository } from '../repositories/AcademicYearRepository';
import { DateService } from 'infra/services/DateService';

@singleton()
export class UpdateAcademicYearService {
  constructor(private academicYearRepository: AcademicYearRepository, private dateService: DateService) {}

  async execute(params: UpdateAcademyYearDTO): Promise<void> {
    const { id, year, startDate, endDate } = params;

    if (!(await this.academicYearRepository.exists(id))) {
      throw new AppError('Este ano acadêmico não existe!');
    }

    const startDateUTC = this.dateService.toDate(startDate);
    const endDateUTC = this.dateService.toDate(endDate);

    if (this.dateService.compareIfBefore(startDateUTC, endDateUTC)) {
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
