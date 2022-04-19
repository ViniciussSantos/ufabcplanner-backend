import 'infra/container/providers';
import { container } from 'tsyringe';

import { IUsersRepository } from 'modules/accounts/repositories/IUsersRepository';
import { PrismaUserRepository } from 'modules/accounts/repositories/prisma/PrismaUserRepository';
import { IAcademicYearRepository } from 'modules/academicYears/repositories/IAcademicYearRepository';
import { PrismaAcademicYearRepository } from 'modules/academicYears/repositories/prisma/PrismaAcademicYearRepository';

container.registerSingleton<IUsersRepository>('PrismaUserRepository', PrismaUserRepository);
container.registerSingleton<IAcademicYearRepository>('PrismaAcademicYearRepository', PrismaAcademicYearRepository);
