import { Quarter } from '@prisma/client';

export interface IQuarterRepository {
  quarterExists(quarterId: string): Promise<boolean>;
  createQuarter(quarter: Omit<Quarter, 'id'>): Promise<void>;
  deleteQuarter(quarterId: string): Promise<void>;
  updateQuarter(quarter: Omit<Quarter, 'academyYearId'>): Promise<void>;
  getQuarterByAcademicYearId(academicYearId: string): Promise<Quarter[]>;
}
