import { Class } from '@prisma/client';
import { singleton } from 'tsyringe';
import { GetClassesByUserIdDTO } from '../dtos/GetClassesByUserId.dto';
import { PrismaClassRepository } from '../repositories/prisma/PrismaClassRepository';

@singleton()
export class GetClassesByUserIdService {
  constructor(private classRepository: PrismaClassRepository) {}

  execute({ id }: GetClassesByUserIdDTO): Promise<Class[]> {
    return this.classRepository.getClassesByUserId(id);
  }
}
