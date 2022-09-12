import { AppError } from 'infra/http/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { DeleteClassDTO } from '../dtos/DeleteClass.dto';
import { IClassRepository } from '../repositories/IClassRepository';

@injectable()
export class DeleteClassService {
  constructor(
    @inject('PrismaClassRepository')
    private ClassRepository: IClassRepository,
  ) {}

  async handle({ id }: DeleteClassDTO) {
    if (!(await this.ClassRepository.classExists(id))) {
      throw new AppError('classe não existe');
    }

    await this.ClassRepository.deleteClass(id);
  }
}
