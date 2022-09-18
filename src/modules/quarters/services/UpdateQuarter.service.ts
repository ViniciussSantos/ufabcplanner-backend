import { AppError } from 'infra/http/errors/AppError';
import { singleton } from 'tsyringe';
import { UpdateQuarterDTO } from '../dtos/UpdateQuarter.dto';
import { DayjsDateProvider } from 'infra/services/DayjsDateProvider';
import { PrismaQuarterRepository } from '../repositories/prisma/PrismaQuarterRepository';

@singleton()
export class UpdateQuarterService {
  constructor(private quarterRepository: PrismaQuarterRepository, private dateProvider: DayjsDateProvider) {}

  async execute(params: UpdateQuarterDTO) {
    const { id, startDate, endDate } = params;

    const startDateUTC = this.dateProvider.toDate(startDate);
    const endDateUTC = this.dateProvider.toDate(endDate);

    if (this.dateProvider.compareIfBefore(startDateUTC, endDateUTC)) {
      throw new AppError('Data final é antes da data inicial');
    }

    await this.quarterRepository.updateQuarter({
      id,
      startDate: startDateUTC,
      endDate: endDateUTC,
    });
  }
}
