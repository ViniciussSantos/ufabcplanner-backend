import { Exam } from '@prisma/client';
import dayjs from 'dayjs';
import { prisma } from 'infra/prisma/client';
import { CreateExamDTO } from 'modules/exams/dtos/CreateExam.dto';
import { UpdateExamDTO } from 'modules/exams/dtos/UpdateExam.dto';
import { IExamRepository } from '../IExamRepository';

export class PrismaExamRepository implements IExamRepository {
  async createExam(params: CreateExamDTO): Promise<void> {
    await prisma.exam.create({
      data: {
        ...params,
        dueDate: dayjs(params.dueDate).toDate(),
      },
    });
  }

  async deleteExam(id: string): Promise<void> {
    await prisma.exam.delete({
      where: {
        id,
      },
    });
  }

  async updateExam(params: UpdateExamDTO): Promise<void> {
    await prisma.exam.update({
      where: {
        id: params.id,
      },
      data: {
        ...params,
        dueDate: dayjs(params.dueDate).toDate(),
      },
    });
  }

  getExamsBySubjectId(subjectId: string): Promise<Exam[]> {
    return prisma.exam.findMany({
      where: {
        subjectId,
      },
    });
  }

  getExamsByUserId(userId: string): Promise<Exam[]> {
    return prisma.exam.findMany({
      where: {
        userId,
      },
    });
  }

  async ExamExists(id: string): Promise<boolean> {
    const exam = await prisma.exam.findUnique({
      where: {
        id,
      },
    });

    if (!exam) {
      return false;
    }

    return true;
  }
}
