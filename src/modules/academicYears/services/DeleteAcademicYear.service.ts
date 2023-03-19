import { singleton } from 'tsyringe';
import { DeleteAcademyYearDTO } from '../dtos/DeleteAcademyYea.dto';
import { AcademicYearRepository } from '../repositories/AcademicYearRepository';
import { ObjectNotFoundError } from 'infra/http/errors/ObjectNotFoundError';
import { OwnershipError } from 'infra/http/errors/OwnershipError';

@singleton()
export class DeleteAcademicYearService {
  constructor(private academicYearRepository: AcademicYearRepository) {}

  async execute(params: DeleteAcademyYearDTO, userId: string): Promise<void> {
    const { academicYearId } = params;

    const academicYear = await this.academicYearRepository.getByAcademicYearId(academicYearId);

    if (!academicYear) {
      throw new ObjectNotFoundError('Ano acadêmico', academicYearId);
    }
    if (academicYear.userId !== userId) {
      throw new OwnershipError('usuário', 'ano academico');
    }

    await this.academicYearRepository.delete(academicYearId);
  }
}
