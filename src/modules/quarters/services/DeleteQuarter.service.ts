import { AppError } from 'infra/http/errors/AppError';
import { singleton } from 'tsyringe';
import { DeleteQuarterDTO } from '../dtos/DeleteQuarter.dto';
import { PrismaQuarterRepository } from '../repositories/prisma/PrismaQuarterRepository';

@singleton()
export class DeleteQuarterService {
  constructor(private quarterRepository: PrismaQuarterRepository) {}

  async execute(params: DeleteQuarterDTO) {
    if (!(await this.quarterRepository.quarterExists(params.id))) {
      throw new AppError('Quadrimestre não existe');
    }

    await this.quarterRepository.deleteQuarter(params.id);
  }
}
