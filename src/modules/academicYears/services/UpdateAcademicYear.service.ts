import { singleton } from 'tsyringe';
import { UpdateAcademyYearDTO } from '../dtos/UpdateAcademicYear.dto';
import { AcademicYearRepository } from '../repositories/AcademicYearRepository';
import { DateService } from 'infra/services/DateService';
import { BusinessLogicError } from 'infra/http/errors/BusinessLogicError';
import { ObjectNotFoundError } from 'infra/http/errors/ObjectNotFoundError';

@singleton()
export class UpdateAcademicYearService {
  constructor(private academicYearRepository: AcademicYearRepository, private dateService: DateService) {}

  async execute(params: UpdateAcademyYearDTO): Promise<void> {
    const { id, year, startDate, endDate } = params;

    if (!(await this.academicYearRepository.exists(id))) {
      throw new ObjectNotFoundError('ano acadêmico', id);
    }

    const startDateUTC = this.dateService.toDate(startDate);
    const endDateUTC = this.dateService.toDate(endDate);

    if (this.dateService.compareIfBefore(startDateUTC, endDateUTC)) {
      throw new BusinessLogicError('Data final é antes da data inicial');
    }

    await this.academicYearRepository.update({
      id,
      year,
      startDate: startDateUTC,
      endDate: endDateUTC,
    });
  }
}
