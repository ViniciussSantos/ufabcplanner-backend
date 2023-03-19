import { ObjectNotFoundError } from 'infra/http/errors/ObjectNotFoundError';
import { singleton } from 'tsyringe';
import { DeleteClassDTO } from '../dtos/DeleteClass.dto';
import { ClassRepository } from '../repositories/ClassRepository';

@singleton()
export class DeleteClassService {
  constructor(private classRepository: ClassRepository) {}

  async execute({ id }: DeleteClassDTO) {
    if (!(await this.classRepository.exists(id))) {
      throw new ObjectNotFoundError('classe', id);
    }

    await this.classRepository.delete(id);
  }
}
