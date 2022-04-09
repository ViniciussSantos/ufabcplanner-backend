import { DateProvider } from 'providers/dateProvider';
import { injectable } from 'tsyringe';
import { AppError } from 'utils/errors/AppError';
import { prisma } from 'utils/prisma';


@injectable()
export class UpdateAcademicYearService {
  constructor(private readonly dateProvider: DateProvider) { }

  async execute(params: UpdateAcademyYearDTO): Promise<void> {
    const academicYearExists = await prisma.academicYear.findUnique({where: {id: params.id}})

    if (!academicYearExists){
      throw new AppError('Este ano acadêmico não existe!')
    }

    const academicYearToSave : any = {}

    Object.entries(params).map(([key, value]) => {

      if(value !== undefined){
        academicYearToSave[key] = value         
      }
    })


    await prisma.academicYear.update({
      where: {id: params.id},
      data: {
        ...academicYearToSave
      },
    });
  }
}
