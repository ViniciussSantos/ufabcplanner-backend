import { Class } from '@prisma/client';
import { AppError } from 'infra/http/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { GetClassesByUserIdDTO } from '../dtos/GetClassesByUserId.dto';
import { IClassRepository } from '../repositories/IClassRepository';

@injectable()
export class GetClassesByUserIdService {
  constructor(
    @inject('PrismaClassRepository')
    private ClassRepository: IClassRepository
  ) {}

  async handle({ id }: GetClassesByUserIdDTO): Promise<Class[]> {
    return this.ClassRepository.getClassesByUserId(id);
  }
}
