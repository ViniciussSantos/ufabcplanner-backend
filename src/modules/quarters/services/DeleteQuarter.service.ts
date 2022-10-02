import { AppError } from 'infra/http/errors/AppError';
import { singleton } from 'tsyringe';
import { DeleteQuarterDTO } from '../dtos/DeleteQuarter.dto';
import { QuarterRepository } from '../repositories/QuarterRepository';

@singleton()
export class DeleteQuarterService {
  constructor(private quarterRepository: QuarterRepository) {}

  async execute(params: DeleteQuarterDTO) {
    if (!(await this.quarterRepository.quarterExists(params.id))) {
      throw new AppError('Quadrimestre não existe');
    }

    await this.quarterRepository.deleteQuarter(params.id);
  }
}
