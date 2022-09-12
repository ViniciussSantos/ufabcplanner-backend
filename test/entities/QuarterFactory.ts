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
