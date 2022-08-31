import { Subject } from '@prisma/client';
import { CreateSubjectDTO } from '../dtos/CreateSubject.dto';
import { UpdateSubjectDTO } from '../dtos/UpdateSubject.dto';

export interface ISubjectRepository {
  subjectExists(id: string): Promise<boolean>;
  createSubject(params: CreateSubjectDTO): Promise<void>;
  deleteSubject(id: string): Promise<void>;
  updateSubject(quarter: UpdateSubjectDTO): Promise<void>;
  getSubjectByQuarterId(quarterId: string): Promise<Subject[]>;
  getSubjectByUserId(userId: string): Promise<Subject[]>;
}
