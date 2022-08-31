import 'infra/container/providers';
import { container } from 'tsyringe';

import { IUsersRepository } from 'modules/accounts/repositories/IUsersRepository';
import { PrismaUserRepository } from 'modules/accounts/repositories/prisma/PrismaUserRepository';
import { IAcademicYearRepository } from 'modules/academicYears/repositories/IAcademicYearRepository';
import { PrismaAcademicYearRepository } from 'modules/academicYears/repositories/prisma/PrismaAcademicYearRepository';
import { IQuarterRepository } from 'modules/quarters/repositories/IQuarterRepository';
import { PrismaQuarterRepository } from 'modules/quarters/repositories/prisma/PrismaQuarterRepository';
import { ISubjectRepository } from 'modules/subjects/repositories/ISubjectRepository';
import { PrismaSubjectRepository } from 'modules/subjects/repositories/prisma/PrismaSubjectRepository';
import { IClassRepository } from 'modules/classes/repositories/IClassRepository';
import { PrismaClassRepository } from 'modules/classes/repositories/prisma/PrismaClassRepository';
import { ITaskRepository } from 'modules/tasks/repositories/ITaskRepository';
import { PrismaTaskRepository } from 'modules/tasks/repositories/prisma/PrismaTaskRepository';
import { IExamRepository } from 'modules/exams/repositories/IExamRepository';
import { PrismaExamRepository } from 'modules/exams/repositories/prisma/PrismaExamRepository';

container.registerSingleton<IUsersRepository>('PrismaUserRepository', PrismaUserRepository);
container.registerSingleton<IAcademicYearRepository>('PrismaAcademicYearRepository', PrismaAcademicYearRepository);
container.registerSingleton<IQuarterRepository>('PrismaQuarterRepository', PrismaQuarterRepository);
container.registerSingleton<ISubjectRepository>('PrismaSubjectRepository', PrismaSubjectRepository);
container.registerSingleton<IClassRepository>('PrismaClassRepository', PrismaClassRepository);
container.registerSingleton<ITaskRepository>('PrismaTaskRepository', PrismaTaskRepository);
container.registerSingleton<IExamRepository>('PrismaExamRepository', PrismaExamRepository);
