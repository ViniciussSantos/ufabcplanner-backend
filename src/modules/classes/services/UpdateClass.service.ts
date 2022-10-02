import { AppError } from 'infra/http/errors/AppError';
import { singleton } from 'tsyringe';
import { UpdateClassDTO } from '../dtos/UpdateClass.dto';
import { ClassRepository } from '../repositories/ClassRepository';

@singleton()
export class UpdateClassService {
  constructor(private classRepository: ClassRepository) {}

  async execute(params: UpdateClassDTO) {
    if (!(await this.classRepository.exists(params.id))) {
      throw new AppError('classe não existe');
    }

    await this.classRepository.update(params);
  }
}
