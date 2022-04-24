import { prisma } from '@prisma/client';
import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, disconnect } from '../../../../test/database';
import { CreateAcademicYear } from '../../../../test/entities/AcademicYearFactory';
import { createQuarter } from '../../../../test/entities/QuarterFactory';
import { createUser, authenticateUser } from '../../../../test/entities/UserFactory';

describe('create subject (e2e)', () => {
  beforeAll(async () => {
    deleteAll();
  });

  afterAll(async () => {
    disconnect();
  });

  it('Should create a subject successfully', async () => {
    const user = await createUser();
    const token = await authenticateUser(user);
    const academicYear = await CreateAcademicYear(user);
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
