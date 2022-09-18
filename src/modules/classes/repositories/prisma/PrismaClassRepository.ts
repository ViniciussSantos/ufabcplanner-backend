import { Class } from '@prisma/client';
import { prisma } from 'infra/prisma/client';
import { CreateClassDTO } from 'modules/classes/dtos/CreateClass.dto';
import { UpdateClassDTO } from 'modules/classes/dtos/UpdateClass.dto';
import { singleton } from 'tsyringe';
import { IClassRepository } from '../IClassRepository';

@singleton()
export class PrismaClassRepository implements IClassRepository {
  async classExists(id: string): Promise<boolean> {
    const classExists = await prisma.class.findUnique({
      where: {
        id,
      },
    });

    if (!classExists) {
      return false;
    }

    return true;
  }

  async createClass(params: CreateClassDTO): Promise<void> {
    await prisma.class.create({
      data: { ...params },
    });
  }

  async deleteClass(id: string): Promise<void> {
    await prisma.class.delete({
      where: {
        id,
      },
    });
  }

  async updateClass(params: UpdateClassDTO): Promise<void> {
    await prisma.class.update({
      where: {
        id: params.id,
      },
      data: {
        ...params,
      },
    });
  }

  getClassesBySubjectId(subjectId: string): Promise<Class[]> {
    return prisma.class.findMany({
      where: {
        subjectId,
      },
    });
  }

  getClassesByUserId(userId: string): Promise<Class[]> {
    return prisma.class.findMany({
      where: {
        userId,
      },
      include: {
        subject: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}
