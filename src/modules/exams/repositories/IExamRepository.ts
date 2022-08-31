import { Exam } from '@prisma/client';
import { CreateExamDTO } from '../dtos/CreateExam.dto';
import { UpdateExamDTO } from '../dtos/UpdateExam.dto';

export interface IExamRepository {
  createExam(params: CreateExamDTO): Promise<void>;
  deleteExam(id: string): Promise<void>;
  updateExam(params: UpdateExamDTO): Promise<void>;
  getExamsBySubjectId(subjectId: string): Promise<Exam[]>;
  getExamsByUserId(userId: string): Promise<Exam[]>;
  ExamExists(id: string): Promise<boolean>;
}
