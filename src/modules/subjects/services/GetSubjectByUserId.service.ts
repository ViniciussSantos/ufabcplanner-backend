import { Subject } from '@prisma/client';
import { singleton } from 'tsyringe';
import { GetSubjectByUserIdDTO } from '../dtos/GetSubjectByUserId.dto';
import { SubjectRepository } from '../repositories/SubjectRepository';

@singleton()
export class GetSubjectByUserIdService {
  constructor(private subjectRepository: SubjectRepository) {}

  execute({ id }: GetSubjectByUserIdDTO): Promise<Subject[]> {
    return this.subjectRepository.getSubjectByUserId(id);
  }
}
