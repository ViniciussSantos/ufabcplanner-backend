import dayjs from 'dayjs';
import { AppError } from 'infra/http/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { CreateClassDTO } from '../dtos/CreateClass.dto';
import { IClassRepository } from '../repositories/IClassRepository';

@injectable()
export class CreateClassService {
  constructor(
    @inject('PrismaClassRepository')
    private ClassRepository: IClassRepository
  ) {}

  async handle(params: CreateClassDTO): Promise<void> {
    if (params.startTime > params.endTime) {
      throw new AppError('horário final é antes do horário inicial');
    }

    await this.ClassRepository.createClass(params);
  }
}
