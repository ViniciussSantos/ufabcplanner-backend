import { Class } from '@prisma/client';
import { prisma } from 'infra/prisma/client';
import { CreateClassDTO } from 'modules/classes/dtos/CreateClass.dto';
import { UpdateClassDTO } from 'modules/classes/dtos/UpdateClass.dto';
import { singleton } from 'tsyringe';

@singleton()
export class ClassRepository {
  async exists(id: string): Promise<boolean> {
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

  async create(params: CreateClassDTO): Promise<void> {
    await prisma.class.create({
      data: { ...params },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.class.delete({
      where: {
        id,
      },
    });
  }

  async update({ id, ...params }: UpdateClassDTO): Promise<void> {
    await prisma.class.update({
      where: {
        id,
      },
      data: {
        ...params,
      },
    });
  }

  getBySubjectId(subjectId: string): Promise<Class[]> {
    return prisma.class.findMany({
      where: {
        subjectId,
      },
    });
  }

  getByUserId(userId: string): Promise<Class[]> {
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
