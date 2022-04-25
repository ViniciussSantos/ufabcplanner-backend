import { Subject } from '@prisma/client';
import { CreateSubjectDTO } from '../dtos/CreateSubjectDTO';
import { UpdateSubjectDTO } from '../dtos/UpdateSubjectDTO';

export interface ISubjectRepository {
  subjectExists(id: string): Promise<boolean>;
  createSubject(params: CreateSubjectDTO): Promise<void>;
  deleteSubject(id: string): Promise<void>;
  updateSubject(quarter: UpdateSubjectDTO): Promise<void>;
  getSubjectByQuarterId(quarterId: string): Promise<Subject[]>;
}
