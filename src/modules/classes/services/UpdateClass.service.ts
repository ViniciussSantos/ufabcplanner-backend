import { ObjectNotFoundError } from 'infra/http/errors/ObjectNotFoundError';
import { singleton } from 'tsyringe';
import { UpdateClassDTO } from '../dtos/UpdateClass.dto';
import { ClassRepository } from '../repositories/ClassRepository';

@singleton()
export class UpdateClassService {
  constructor(private classRepository: ClassRepository) {}

  async execute(params: UpdateClassDTO) {
    if (!(await this.classRepository.exists(params.id))) {
      throw new ObjectNotFoundError('classe', params.id);
    }

    await this.classRepository.update(params);
  }
}
