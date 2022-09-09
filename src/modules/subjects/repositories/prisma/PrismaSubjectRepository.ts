import { Subject } from '@prisma/client';
import { prisma } from 'infra/prisma/client';
import { CreateSubjectDTO } from 'modules/subjects/dtos/CreateSubject.dto';
import { UpdateSubjectDTO } from 'modules/subjects/dtos/UpdateSubject.dto';
import { ISubjectRepository } from '../ISubjectRepository';

export class PrismaSubjectRepository implements ISubjectRepository {
  async subjectExists(id: string): Promise<boolean> {
    const subject = await prisma.subject.findUnique({
      where: {
        id,
      },
    });

    if (!subject) {
      return false;
    }

    return true;
  }

  async createSubject(params: CreateSubjectDTO): Promise<void> {
    await prisma.subject.create({
      data: {
        ...params,
      },
    });
  }

  async deleteSubject(id: string): Promise<void> {
    await prisma.subject.delete({
      where: {
        id,
      },
    });
  }

  async updateSubject(quarter: UpdateSubjectDTO): Promise<void> {
    await prisma.subject.update({
      where: {
        id: quarter.id,
      },
      data: {
        name: quarter.name,
        description: quarter.description,
      },
    });
  }

  getSubjectByQuarterId(quarterId: string): Promise<Subject[]> {
    return prisma.subject.findMany({
      where: {
        quarterId,
      },
    });
  }

  getSubjectByUserId(userId: string): Promise<Subject[]> {
    return prisma.subject.findMany({
      where: {
        userId,
      },
    });
  }
}
