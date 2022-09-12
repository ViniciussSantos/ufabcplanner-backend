import { Subject } from '@prisma/client';
import { injectable, inject } from 'tsyringe';
import { GetSubjectByUserIdDTO } from '../dtos/GetSubjectByUserId.dto';
import { ISubjectRepository } from '../repositories/ISubjectRepository';

@injectable()
export class GetSubjectByUserIdService {
  constructor(
    @inject('PrismaSubjectRepository')
    private subjectRepository: ISubjectRepository,
  ) {}

  execute({ id }: GetSubjectByUserIdDTO): Promise<Subject[]> {
    return this.subjectRepository.getSubjectByUserId(id);
  }
}
