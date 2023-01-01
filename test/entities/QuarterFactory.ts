import { AcademicYear, Quarter } from '@prisma/client';
import dayjs from 'dayjs';
import { prisma } from 'infra/prisma/client';

export function createQuarter(params: AcademicYear): Promise<Quarter> {
  return prisma.quarter.create({
    data: {
      academyYearId: params.id,
      startDate: dayjs().toDate(),
      endDate: dayjs().toDate(),
    },
  });
}

export function getQuarterById(quarterId: string): Promise<Quarter | null> {
  return prisma.quarter.findUnique({
    where: {
      id: quarterId,
    },
  });
}

export function getFirstQuarterByAcademicYearId(academicYearId: string): Promise<Quarter | null> {
  return prisma.quarter.findFirst({
    where: {
      academyYearId: academicYearId,
    },
  });
}
