import { app } from 'infra/http/app';
import { prisma } from 'infra/prisma/client';
import supertest from 'supertest';
import { deleteAll, closeConnection } from '../../database';
import { createAcademicYear } from '../../entities/AcademicYearFactory';
import { createUser, authenticateUser } from '../../entities/UserFactory';

describe('Create Quarter (e2e)', () => {
  beforeAll(async () => {
    await deleteAll();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it('Should create a quarter successfully', async () => {
    const user = await createUser();
    const token = authenticateUser(user);
    const academicYear = await createAcademicYear(user);

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
