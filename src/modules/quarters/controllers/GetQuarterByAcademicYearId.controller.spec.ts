import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, disconnect } from '../../../../test/database';
import { createAcademicYear } from '../../../../test/entities/AcademicYearFactory';
import { createQuarter } from '../../../../test/entities/QuarterFactory';
import { createUser, authenticateUser } from '../../../../test/entities/UserFactory';

describe('Get quarters by academic year (e2e)', () => {
  beforeAll(async () => {
    await deleteAll();
  });

  afterAll(async () => {
    await disconnect();
  });

  it('should return a quarter', async () => {
    const user = await createUser();
    const token = authenticateUser(user);
    const academicYear = await createAcademicYear(user);

    await createQuarter(academicYear);

    const response = await supertest(app)
      .get('/quarters/get/academicyear/' + academicYear.id)
      .set('authorization', 'Bearer ' + token);

    const responseBody = JSON.parse(response.text);

    expect(response.status).toBe(200);
    expect(responseBody.length).toBe(1);
    expect(responseBody[0].academyYearId).toBe(academicYear.id);
  });
});
