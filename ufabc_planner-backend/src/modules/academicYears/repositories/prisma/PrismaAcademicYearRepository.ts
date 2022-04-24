import { AcademicYear } from '@prisma/client';
import { prisma } from 'infra/prisma/client';
import { CreateAcademyYearDTO } from 'modules/academicYears/dtos/CreateAcademyYearDTO';
import { UpdateAcademyYearDTO } from 'modules/academicYears/dtos/UpdateAcademicYearDTO';
import { IAcademicYearRepository } from '../IAcademicYearRepository';

type updateAcademicYear = {
  id: string;
  year: string | undefined;
  startDate: Date;
  endDate: Date;
};

export class PrismaAcademicYearRepository implements IAcademicYearRepository {
  async create(academicYear: Omit<AcademicYear, 'id' | 'created_at'>): Promise<void> {
    await prisma.academicYear.create({
      data: {
        userId: academicYear.userId,
        year: academicYear.year,
        start_date: academicYear.start_date,
        end_date: academicYear.end_date,
      },
    });
  }

  async delete(academicYearId: string): Promise<void> {
    await prisma.academicYear.delete({
      where: {
        id: academicYearId,
      },
    });
  }

  async getByUserId(userId: string): Promise<AcademicYear[]> {
    return prisma.academicYear.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async update(academicYear: updateAcademicYear): Promise<void> {
    await prisma.academicYear.update({
      where: {
        id: academicYear.id,
      },
      data: {
        year: academicYear.year,
        start_date: academicYear.startDate,
        end_date: academicYear.endDate,
      },
    });
  }

  async exists(academicYearId: string): Promise<boolean> {
    const academicYear = await prisma.academicYear.findUnique({
      where: {
        id: academicYearId,
      },
    });

    if (!academicYear) return false;

    return true;
  }

  async getByAcademicYearId(academicYearId: string): Promise<AcademicYear | null> {
    return prisma.academicYear.findUnique({
      where: {
        id: academicYearId,
      },
    });
  }
}
