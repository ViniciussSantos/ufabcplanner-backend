import { Exam } from '@prisma/client';
import dayjs from 'dayjs';
import { prisma } from 'infra/prisma/client';
import { CreateExamDTO } from 'modules/exams/dtos/CreateExam.dto';
import { UpdateExamDTO } from 'modules/exams/dtos/UpdateExam.dto';
import { singleton } from 'tsyringe';

@singleton()
export class ExamRepository {
  async create(params: CreateExamDTO): Promise<void> {
    await prisma.exam.create({
      data: {
        ...params,
        dueDate: dayjs(params.dueDate).toDate(),
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.exam.delete({
      where: {
        id,
      },
    });
  }

  async update({ id, ...params }: UpdateExamDTO): Promise<void> {
    await prisma.exam.update({
      where: {
        id,
      },
      data: {
        ...params,
        dueDate: dayjs(params.dueDate).toDate(),
      },
    });
  }

  getBySubjectId(subjectId: string): Promise<Exam[]> {
    return prisma.exam.findMany({
      where: {
        subjectId,
      },
    });
  }

  getByUserId(userId: string): Promise<Exam[]> {
    return prisma.exam.findMany({
      where: {
        userId,
      },
    });
  }

  async exists(id: string): Promise<boolean> {
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
