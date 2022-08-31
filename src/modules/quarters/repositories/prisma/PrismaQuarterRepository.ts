import { Quarter } from '@prisma/client';
import { prisma } from 'infra/prisma/client';
import { IQuarterRepository } from '../IQuarterRepository';

export class PrismaQuarterRepository implements IQuarterRepository {
  async quarterExists(quarterId: string): Promise<boolean> {
    const quarter = await prisma.quarter.findUnique({
      where: {
        id: quarterId,
      },
    });

    if (!quarter) return false;

    return true;
  }

  async createQuarter(quarter: Omit<Quarter, 'id'>): Promise<void> {
    await prisma.quarter.create({
      data: {
        ...quarter,
      },
    });
  }

  async deleteQuarter(quarterId: string): Promise<void> {
    await prisma.quarter.delete({
      where: {
        id: quarterId,
      },
    });
  }

  async updateQuarter(quarter: Omit<Quarter, 'academyYearId'>): Promise<void> {
    await prisma.quarter.update({
      where: {
        id: quarter.id,
      },
      data: {
        startDate: quarter.startDate,
        endDate: quarter.endDate,
      },
    });
  }

  async getQuarterByAcademicYearId(academicYearId: string): Promise<Quarter[]> {
    return prisma.quarter.findMany({
      where: {
        academyYearId: academicYearId,
      },
    });
  }
}
