import { IDateProvider } from 'infra/container/providers/DateProvider/IDateProvider';
import { AppError } from 'infra/http/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { createQuarterDTO } from '../dtos/CreateQuarterDTO';
import { DeleteQuarterDTO } from '../dtos/DeleteQuarterDTO';
import { IQuarterRepository } from '../repositories/IQuarterRepository';

@injectable()
export class DeleteQuarterService {
  constructor(
    @inject('PrismaQuarterRepository')
    private QuarterRepository: IQuarterRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}
  async execute(params: DeleteQuarterDTO) {
    if (!(await this.QuarterRepository.quarterExists(params.id))) {
      throw new AppError('Quadrimestre não existe');
    }

    await this.QuarterRepository.deleteQuarter(params.id);
  }
}
