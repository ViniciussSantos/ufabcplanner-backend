import { AcademicYear } from '@prisma/client';
import { prisma } from 'infra/prisma/client';
import { singleton } from 'tsyringe';

type updateAcademicYear = {
  id: string;
  year: string | undefined;
  startDate: Date;
  endDate: Date;
};

@singleton()
export class AcademicYearRepository {
  async create(academicYear: Omit<AcademicYear, 'id' | 'created_at'>): Promise<void> {
    await prisma.academicYear.create({
      data: {
        ...academicYear,
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

  getByUserId(userId: string): Promise<AcademicYear[]> {
    return prisma.academicYear.findMany({
      where: {
        userId,
      },
    });
  }

  async update({ id, ...params }: updateAcademicYear): Promise<void> {
    await prisma.academicYear.update({
      where: {
        id,
      },
      data: {
        ...params,
      },
    });
  }

  async exists(academicYearId: string): Promise<boolean> {
    const academicYear = await prisma.academicYear.findUnique({
      where: {
        id: academicYearId,
      },
    });

    if (!academicYear) {
      return false;
    }

    return true;
  }

  getByAcademicYearId(academicYearId: string): Promise<AcademicYear | null> {
    return prisma.academicYear.findUnique({
      where: {
        id: academicYearId,
      },
    });
  }
}
