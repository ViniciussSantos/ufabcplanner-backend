import { AppError } from 'infra/http/errors/AppError';
import { singleton } from 'tsyringe';
import { DeleteClassDTO } from '../dtos/DeleteClass.dto';
import { ClassRepository } from '../repositories/ClassRepository';

@singleton()
export class DeleteClassService {
  constructor(private classRepository: ClassRepository) {}

  async execute({ id }: DeleteClassDTO) {
    if (!(await this.classRepository.exists(id))) {
      throw new AppError('classe não existe');
    }

    await this.classRepository.delete(id);
  }
}
