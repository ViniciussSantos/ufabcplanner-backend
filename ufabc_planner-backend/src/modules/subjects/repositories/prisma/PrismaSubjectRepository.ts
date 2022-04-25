import { Subject } from '@prisma/client';
import { prisma } from 'infra/prisma/client';
import { CreateSubjectDTO } from 'modules/subjects/dtos/CreateSubjectDTO';
import { UpdateSubjectDTO } from 'modules/subjects/dtos/UpdateSubjectDTO';
import { ISubjectRepository } from '../ISubjectRepository';

export class PrismaSubjectRepository implements ISubjectRepository {
  async subjectExists(id: string): Promise<boolean> {
    const subject = await prisma.subject.findUnique({
      where: {
        id: id,
      },
    });

    if (!subject) return false;

    return true;
  }

  async createSubject(params: CreateSubjectDTO): Promise<void> {
    await prisma.subject.create({
      data: {
        name: params.name,
        description: params.description,
        quarterId: params.quarterId,
      },
    });
  }

  async deleteSubject(id: string): Promise<void> {
    await prisma.subject.delete({
      where: {
        id: id,
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
        quarterId: quarterId,
      },
    });
  }
}
