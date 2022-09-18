import { singleton } from 'tsyringe';
import { AppError } from 'infra/http/errors/AppError';
import { DeleteAcademyYearDTO } from '../dtos/DeleteAcademyYea.dto';
import { PrismaAcademicYearRepository } from '../repositories/prisma/PrismaAcademicYearRepository';

@singleton()
export class DeleteAcademicYearService {
  constructor(private academicYearRepository: PrismaAcademicYearRepository) {}

  async execute(params: DeleteAcademyYearDTO, userId: string): Promise<void> {
    const { academicYearId } = params;

    const academicYear = await this.academicYearRepository.getByAcademicYearId(academicYearId);

    if (!academicYear) {
      throw new AppError('Ano acadêmico não existe');
    }
    if (academicYear.userId !== userId) {
      throw new AppError('Usuário não é dono desse ano academico');
    }

    await this.academicYearRepository.delete(academicYearId);
  }
}
