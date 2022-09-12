import { AcademicYear, User } from '@prisma/client';
import dayjs from 'dayjs';
import { prisma } from 'infra/prisma/client';

export async function createAcademicYear(user: User): Promise<AcademicYear> {
  const AcademicYear = await prisma.academicYear.create({
    data: {
      userId: user.id,
      year: '2022',
      end_date: dayjs().toDate(),
      start_date: dayjs().toDate(),
    },
  });

  return AcademicYear;
}

export function getAcademicYearById(academicYearId: string): Promise<AcademicYear | null> {
  return prisma.academicYear.findUnique({
    where: {
      id: academicYearId,
    },
  });
}
