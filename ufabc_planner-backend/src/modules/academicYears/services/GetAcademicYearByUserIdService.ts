import { AcademicYear } from '@prisma/client';
import { start } from 'repl';
import { injectable } from 'tsyringe';
import { AppError } from 'utils/errors/AppError';
import { prisma } from 'utils/prisma';

@injectable()
export class GetAcademicYearByUserIdService {
  async execute(userId: string): Promise<Partial<AcademicYear>[]> {
    const academicYears = await prisma.academicYear.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        year: true,
        start_date: true,
        end_date: true,
      },
    });

    if (academicYears.length == 0) {
      throw new AppError('O usuário não tem nenhum ano acadêmico cadastrado');
    }

    return academicYears.map((value) => {
      return {
        id: value.id,
        year: value.year,
        starDate: value.start_date.toISOString().split('T')[0],
        endDate: value.end_date.toISOString().split('T')[0],
      };
    });
  }
}
