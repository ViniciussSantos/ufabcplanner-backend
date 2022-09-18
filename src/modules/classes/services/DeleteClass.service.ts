import { AppError } from 'infra/http/errors/AppError';
import { singleton } from 'tsyringe';
import { DeleteClassDTO } from '../dtos/DeleteClass.dto';
import { PrismaClassRepository } from '../repositories/prisma/PrismaClassRepository';

@singleton()
export class DeleteClassService {
  constructor(private classRepository: PrismaClassRepository) {}

  async execute({ id }: DeleteClassDTO) {
    if (!(await this.classRepository.classExists(id))) {
      throw new AppError('classe não existe');
    }

    await this.classRepository.deleteClass(id);
  }
}
