import { Subject } from '@prisma/client';
import { prisma } from 'infra/prisma/client';
import { CreateSubjectDTO } from 'modules/subjects/dtos/CreateSubject.dto';
import { UpdateSubjectDTO } from 'modules/subjects/dtos/UpdateSubject.dto';
import { singleton } from 'tsyringe';

@singleton()
export class SubjectRepository {
  async exists(id: string): Promise<boolean> {
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

  async create(params: CreateSubjectDTO): Promise<void> {
    await prisma.subject.create({
      data: {
        ...params,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.subject.delete({
      where: {
        id,
      },
    });
  }

  async update({ id, ...params }: UpdateSubjectDTO): Promise<void> {
    await prisma.subject.update({
      where: {
        id,
      },
      data: {
        ...params,
      },
    });
  }

  getByQuarterId(quarterId: string): Promise<Subject[]> {
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
