import { AppError } from 'infra/http/errors/AppError';
import { singleton } from 'tsyringe';
import { UpdateQuarterDTO } from '../dtos/UpdateQuarter.dto';
import { DateService } from 'infra/services/DateService';
import { PrismaQuarterRepository } from '../repositories/prisma/PrismaQuarterRepository';

@singleton()
export class UpdateQuarterService {
  constructor(private quarterRepository: PrismaQuarterRepository, private dateService: DateService) {}

  async execute(params: UpdateQuarterDTO) {
    const { id, startDate, endDate } = params;

    const startDateUTC = this.dateService.toDate(startDate);
    const endDateUTC = this.dateService.toDate(endDate);

    if (this.dateService.compareIfBefore(startDateUTC, endDateUTC)) {
      throw new AppError('Data final é antes da data inicial');
    }

    await this.quarterRepository.updateQuarter({
      id,
      startDate: startDateUTC,
      endDate: endDateUTC,
    });
  }
}
