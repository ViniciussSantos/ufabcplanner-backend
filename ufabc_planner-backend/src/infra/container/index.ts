import 'infra/container/providers';
import { container } from 'tsyringe';

import { IUsersRepository } from 'modules/accounts/repositories/IUsersRepository';
import { PrismaUserRepository } from 'modules/accounts/repositories/prisma/PrismaUserRepository';
import { IAcademicYearRepository } from 'modules/academicYears/repositories/IAcademicYearRepository';
import { PrismaAcademicYearRepository } from 'modules/academicYears/repositories/prisma/PrismaAcademicYearRepository';
import { IQuarterRepository } from 'modules/quarters/repositories/IQuarterRepository';
import { PrismaQuarterRepository } from 'modules/quarters/repositories/prisma/PrismaQuarterRepository';

container.registerSingleton<IUsersRepository>('PrismaUserRepository', PrismaUserRepository);
container.registerSingleton<IAcademicYearRepository>('PrismaAcademicYearRepository', PrismaAcademicYearRepository);
container.registerSingleton<IQuarterRepository>('PrismaQuarterRepository', PrismaQuarterRepository);
