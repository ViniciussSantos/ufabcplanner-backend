import { AppError } from 'infra/http/errors/AppError';
import { singleton } from 'tsyringe';
import { CreateClassDTO } from '../dtos/CreateClass.dto';
import { PrismaClassRepository } from '../repositories/prisma/PrismaClassRepository';

@singleton()
export class CreateClassService {
  constructor(private classRepository: PrismaClassRepository) {}

  async execute(params: CreateClassDTO): Promise<void> {
    if (params.startTime > params.endTime) {
      throw new AppError('horário final é antes do horário inicial');
    }

    await this.classRepository.createClass(params);
  }
}
