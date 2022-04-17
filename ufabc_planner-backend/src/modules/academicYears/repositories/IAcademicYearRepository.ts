import { AcademicYear } from '@prisma/client';
import { type } from 'os';
import { CreateAcademyYearDTO } from '../dtos/CreateAcademyYearDTO';
import { UpdateAcademyYearDTO } from '../dtos/UpdateAcademicYearDTO';

type updateAcademicYear = {
  id: string;
  year: string | undefined;
  startDate: Date;
  endDate: Date;
};

export interface IAcademicYearRepository {
  create(academicYear: Omit<AcademicYear, 'id' | 'created_at'>): Promise<void>;
  delete(academicYearId: string): Promise<void>;
  getByUserId(userId: string): Promise<AcademicYear[]>;
  update(academicYear: updateAcademicYear): Promise<void>;
  exists(academicYearId: string): Promise<boolean>;
  getByAcademicYearId(academicYearId: string): Promise<AcademicYear | null>;
}
