import { DateProvider } from 'providers/dateProvider';
import { injectable } from 'tsyringe';
import { AppError } from 'utils/errors/AppError';
import { prisma } from 'utils/prisma';

@injectable()
export class UpdateAcademicYearService {
  constructor(private readonly dateProvider: DateProvider) {}

  async execute(academicYearId: string, params: UpdateAcademyYearDTO): Promise<void> {
    const academicYearExists = await prisma.academicYear.findUnique({ where: { id: academicYearId } });

    if (!academicYearExists) {
      throw new AppError('Este ano acadêmico não existe!');
    }

    const academicYearInput = {
      year: params.year,
      start_date: params.start_date ? this.dateProvider.toDate(params.start_date) : undefined,
      end_date: params.end_date ? this.dateProvider.toDate(params.end_date) : undefined,
    };

    const academicYearToSave: any = {};

    Object.entries(academicYearInput).map(([key, value]) => {
      if (value !== undefined) {
        academicYearToSave[key] = value;
      }
    });

    console.log(Object.keys(academicYearToSave));
    console.log(params);

    if (Object.keys(academicYearToSave).length === 0) {
      throw new AppError('Necessário pelo menos um campo para atualizar');
    }

    await prisma.academicYear.update({
      where: { id: academicYearId },
      data: {
        ...academicYearToSave,
      },
    });
  }
}
