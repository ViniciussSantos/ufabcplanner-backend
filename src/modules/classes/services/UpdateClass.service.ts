import { AppError } from 'infra/http/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { UpdateClassDTO } from '../dtos/UpdateClass.dto';
import { IClassRepository } from '../repositories/IClassRepository';

@injectable()
export class UpdateClassService {
  constructor(
    @inject('PrismaClassRepository')
    private ClassRepository: IClassRepository,
  ) {}

  async handle(params: UpdateClassDTO) {
    if (!(await this.ClassRepository.classExists(params.id))) {
      throw new AppError('classe não existe');
    }

    await this.ClassRepository.updateClass(params);
  }
}
