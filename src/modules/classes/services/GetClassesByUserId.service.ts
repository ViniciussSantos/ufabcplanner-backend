import { Class } from '@prisma/client';
import { singleton } from 'tsyringe';
import { GetClassesByUserIdDTO } from '../dtos/GetClassesByUserId.dto';
import { ClassRepository } from '../repositories/ClassRepository';

@singleton()
export class GetClassesByUserIdService {
  constructor(private classRepository: ClassRepository) {}

  execute({ id }: GetClassesByUserIdDTO): Promise<Class[]> {
    return this.classRepository.getByUserId(id);
  }
}
