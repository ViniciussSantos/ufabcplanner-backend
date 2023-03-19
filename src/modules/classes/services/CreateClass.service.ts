import { BusinessLogicError } from 'infra/http/errors/BusinessLogicError';
import { singleton } from 'tsyringe';
import { CreateClassDTO } from '../dtos/CreateClass.dto';
import { ClassRepository } from '../repositories/ClassRepository';

@singleton()
export class CreateClassService {
  constructor(private classRepository: ClassRepository) {}

  async execute(params: CreateClassDTO): Promise<void> {
    if (params.startTime > params.endTime) {
      throw new BusinessLogicError('horário final é antes do horário inicial');
    }

    await this.classRepository.create(params);
  }
}
