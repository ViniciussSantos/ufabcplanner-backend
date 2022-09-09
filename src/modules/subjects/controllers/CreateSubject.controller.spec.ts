import { prisma } from '@prisma/client';
import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, disconnect } from '../../../../test/database';
import { createAcademicYear } from '../../../../test/entities/AcademicYearFactory';
import { createQuarter } from '../../../../test/entities/QuarterFactory';
import { createUser, authenticateUser } from '../../../../test/entities/UserFactory';

describe('create subject (e2e)', () => {
  beforeAll(async () => {
    await deleteAll();
  });

  afterAll(async () => {
    await disconnect();
  });

  it('Should create a subject successfully', async () => {
    const user = await createUser();
    const token = authenticateUser(user);
    const academicYear = await createAcademicYear(user);
    const quarter = await createQuarter(academicYear);

    const response = await supertest(app)
      .post('/subjects/')
      .set('authorization', 'Bearer ' + token)
      .send({
        quarterId: quarter.id,
        name: 'matéria teste',
        description: 'descrição teste',
      });

    expect(response.status).toBe(201);
  });
});
