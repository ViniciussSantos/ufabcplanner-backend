import { Subject } from '@prisma/client';
import { singleton } from 'tsyringe';
import { GetSubjectByUserIdDTO } from '../dtos/GetSubjectByUserId.dto';
import { PrismaSubjectRepository } from '../repositories/prisma/PrismaSubjectRepository';

@singleton()
export class GetSubjectByUserIdService {
  constructor(private subjectRepository: PrismaSubjectRepository) {}

  execute({ id }: GetSubjectByUserIdDTO): Promise<Subject[]> {
    return this.subjectRepository.getSubjectByUserId(id);
  }
}
