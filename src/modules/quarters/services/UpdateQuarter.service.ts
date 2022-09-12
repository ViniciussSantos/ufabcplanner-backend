import { IDateProvider } from 'infra/container/providers/DateProvider/IDateProvider';
import { AppError } from 'infra/http/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { UpdateQuarterDTO } from '../dtos/UpdateQuarter.dto';
import { IQuarterRepository } from '../repositories/IQuarterRepository';

@injectable()
export class UpdateQuarterService {
  constructor(
    @inject('PrismaQuarterRepository')
    private QuarterRepository: IQuarterRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(params: UpdateQuarterDTO) {
    const { id, startDate, endDate } = params;

    const startDateUTC = this.dateProvider.toDate(startDate);
    const endDateUTC = this.dateProvider.toDate(endDate);

    if (this.dateProvider.compareIfBefore(startDateUTC, endDateUTC)) {
      throw new AppError('Data final é antes da data inicial');
    }

    await this.QuarterRepository.updateQuarter({
      id,
      startDate: startDateUTC,
      endDate: endDateUTC,
    });
  }
}
