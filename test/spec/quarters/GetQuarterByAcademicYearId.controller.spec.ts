import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, closeConnection } from '../../database';
import { createAcademicYear } from '../../entities/AcademicYearFactory';
import { createQuarter } from '../../entities/QuarterFactory';
import { createUser, authenticateUser } from '../../entities/UserFactory';

describe('Get quarters by academic year (e2e)', () => {
  beforeAll(async () => {
    await deleteAll();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it('should return a quarter', async () => {
    const user = await createUser();
    const token = authenticateUser(user);
    const academicYear = await createAcademicYear(user);

    await createQuarter(academicYear);

    const response = await supertest(app)
      .get('/quarters/get/academicyear/' + academicYear.id)
      .set('authorization', 'Bearer ' + token);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].academyYearId).toBe(academicYear.id);
  });
});
