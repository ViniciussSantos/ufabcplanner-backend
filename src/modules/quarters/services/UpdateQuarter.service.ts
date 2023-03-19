import { singleton } from 'tsyringe';
import { UpdateQuarterDTO } from '../dtos/UpdateQuarter.dto';
import { DateService } from 'infra/services/DateService';
import { QuarterRepository } from '../repositories/QuarterRepository';
import { BusinessLogicError } from 'infra/http/errors/BusinessLogicError';

@singleton()
export class UpdateQuarterService {
  constructor(private quarterRepository: QuarterRepository, private dateService: DateService) {}

  async execute(params: UpdateQuarterDTO) {
    const { id, startDate, endDate } = params;

    const startDateUTC = this.dateService.toDate(startDate);
    const endDateUTC = this.dateService.toDate(endDate);

    if (this.dateService.compareIfBefore(startDateUTC, endDateUTC)) {
      throw new BusinessLogicError('Data final é antes da data inicial');
    }

    await this.quarterRepository.updateQuarter({
      id,
      startDate: startDateUTC,
      endDate: endDateUTC,
    });
  }
}
