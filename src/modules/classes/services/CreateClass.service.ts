import { AppError } from 'infra/http/errors/AppError';
import { singleton } from 'tsyringe';
import { CreateClassDTO } from '../dtos/CreateClass.dto';
import { ClassRepository } from '../repositories/ClassRepository';

@singleton()
export class CreateClassService {
  constructor(private classRepository: ClassRepository) {}

  async execute(params: CreateClassDTO): Promise<void> {
    if (params.startTime > params.endTime) {
      throw new AppError('horário final é antes do horário inicial');
    }

    await this.classRepository.create(params);
  }
}
