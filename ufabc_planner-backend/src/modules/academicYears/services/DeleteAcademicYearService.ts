import { CreateUserService } from 'modules/users/services/CreateUserService';
import { DateProvider } from 'providers/dateProvider';
import { injectable } from 'tsyringe';
import { AppError } from 'utils/errors/AppError';
import { prisma } from 'utils/prisma';
import { DeleteAcademyYearDTO } from '../dtos/DeleteAcademyYearDTO';

@injectable()
export class DeleteAcademicYearService {
  async execute(params: DeleteAcademyYearDTO, userId: string): Promise<void> {
    const { academicYearId } = params;

    const academicYear = await prisma.academicYear.findUnique({
      where: {
        id: academicYearId,
      },
    });

    if (!academicYear) throw new AppError('Ano acadêmico não existe');
    if (academicYear.userId !== userId) throw new AppError('Usuário não é dono desse ano academico');

    await prisma.academicYear.delete({
      where: {
        id: academicYearId,
      },
    });
  }
}
