import { app } from 'infra/http/app';
import { prisma } from 'infra/prisma/client';
import supertest from 'supertest';
import { deleteAll, disconnect } from '../../../../test/database';
import { CreateAcademicYear } from '../../../../test/entities/AcademicYearFactory';
import { authenticateUser, createUser } from '../../../../test/entities/UserFactory';
import { generateRandomEmail } from '../../../../test/utils';

describe('Create Quarter (e2e)', () => {
  beforeAll(async () => {
    deleteAll();
  });

  afterAll(async () => {
    disconnect();
  });

  it('Should create a quarter successfully', async () => {
    const user = await createUser();
    const token = await authenticateUser(user);
    const academicYear = await CreateAcademicYear(user);

    const response = await supertest(app)
      .post('/quarters/')
      .set('authorization', 'Bearer ' + token)
      .send({
        academicYearId: academicYear.id,
        startDate: '2022-06-01',
        endDate: '2022-08-01',
      });

    expect(response.status).toBe(201);
    const quarter = await prisma.quarter.findFirst({
      where: {
        academyYearId: academicYear.id,
      },
    });

    expect(quarter).toBeTruthy();
  });
});
