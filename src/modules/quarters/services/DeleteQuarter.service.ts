import { ObjectNotFoundError } from 'infra/http/errors/ObjectNotFoundError';
import { singleton } from 'tsyringe';
import { DeleteQuarterDTO } from '../dtos/DeleteQuarter.dto';
import { QuarterRepository } from '../repositories/QuarterRepository';

@singleton()
export class DeleteQuarterService {
  constructor(private quarterRepository: QuarterRepository) {}

  async execute(params: DeleteQuarterDTO) {
    if (!(await this.quarterRepository.quarterExists(params.id))) {
      throw new ObjectNotFoundError('Quadrimestre', params.id);
    }

    await this.quarterRepository.deleteQuarter(params.id);
  }
}
