import { Class } from '@prisma/client';
import { CreateClassDTO } from '../dtos/CreateClass.dto';
import { UpdateClassDTO } from '../dtos/UpdateClass.dto';

export interface IClassRepository {
  createClass(params: CreateClassDTO): Promise<void>;
  deleteClass(id: string): Promise<void>;
  updateClass(params: UpdateClassDTO): Promise<void>;
  getClassesBySubjectId(subjectId: string): Promise<Class[]>;
  getClassesByUserId(userId: string): Promise<Class[]>;
  classExists(id: string): Promise<boolean>;
}
