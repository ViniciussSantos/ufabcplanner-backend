import { AcademicYear, Quarter } from '@prisma/client';
import dayjs from 'dayjs';
import { prisma } from 'infra/prisma/client';

export async function createQuarter(params: AcademicYear): Promise<Quarter> {
  const quarter = await prisma.quarter.create({
    data: {
      academyYearId: params.id,
      startDate: dayjs().toDate(),
      endDate: dayjs().toDate(),
    },
  });

  return quarter;
}
