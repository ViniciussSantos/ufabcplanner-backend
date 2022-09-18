import { AppError } from 'infra/http/errors/AppError';
import { singleton } from 'tsyringe';
import { UpdateClassDTO } from '../dtos/UpdateClass.dto';
import { PrismaClassRepository } from '../repositories/prisma/PrismaClassRepository';

@singleton()
export class UpdateClassService {
  constructor(private classRepository: PrismaClassRepository) {}

  async execute(params: UpdateClassDTO) {
    if (!(await this.classRepository.classExists(params.id))) {
      throw new AppError('classe não existe');
    }

    await this.classRepository.updateClass(params);
  }
}
