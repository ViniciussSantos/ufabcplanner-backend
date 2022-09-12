import { AppError } from 'infra/http/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { DeleteQuarterDTO } from '../dtos/DeleteQuarter.dto';
import { IQuarterRepository } from '../repositories/IQuarterRepository';

@injectable()
export class DeleteQuarterService {
  constructor(
    @inject('PrismaQuarterRepository')
    private QuarterRepository: IQuarterRepository,
  ) {}

  async execute(params: DeleteQuarterDTO) {
    if (!(await this.QuarterRepository.quarterExists(params.id))) {
      throw new AppError('Quadrimestre não existe');
    }

    await this.QuarterRepository.deleteQuarter(params.id);
  }
}
