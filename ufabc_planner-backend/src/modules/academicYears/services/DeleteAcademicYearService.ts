import { CreateUserService } from 'modules/users/services/CreateUserService';
import { DateProvider } from 'providers/dateProvider';
import { injectable } from 'tsyringe';
import { AppError } from 'utils/errors/AppError';
import { prisma } from 'utils/prisma';

@injectable()
export class DeleteAcademicYearService {
  constructor(private readonly dateProvider: DateProvider) {}

  async delete(idAcademic: string, userId: string): Promise<void> {

    const academicYear = await prisma.academicYear.findUnique({
        where: {
            id: idAcademic
        }
    })

    if(!academicYear) throw new AppError("Ano acadêmico não existe")
    if(academicYear.user_id !== userId) throw new AppError("Usuário não é dono desse ano academico")

    await prisma.academicYear.delete({
        where: {
          id: idAcademic
        },
      })

  }
}
