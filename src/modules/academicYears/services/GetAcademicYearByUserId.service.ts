import { AcademicYear } from '@prisma/client';
import { singleton } from 'tsyringe';
import { AcademicYearRepository } from '../repositories/AcademicYearRepository';

@singleton()
export class GetAcademicYearByUserIdService {
  constructor(private academicYearRepository: AcademicYearRepository) {}

  async execute(userId: string): Promise<Partial<AcademicYear>[]> {
    return this.academicYearRepository.getByUserId(userId);
  }
}
