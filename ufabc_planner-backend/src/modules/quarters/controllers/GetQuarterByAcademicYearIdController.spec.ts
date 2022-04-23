import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, disconnect } from '../../../../test/database';
import { CreateAcademicYear } from '../../../../test/entities/AcademicYearFactory';
import { createQuarter } from '../../../../test/entities/QuarterFactory';
import { createUser, authenticateUser } from '../../../../test/entities/UserFactory';
import { generateRandomEmail } from '../../../../test/utils';

describe('Get quarters by academic year (e2e)', () => {
  beforeAll(async () => {
    deleteAll();
  });

  afterAll(async () => {
    disconnect();
  });

  it('should return a quarter', async () => {
    const email = generateRandomEmail();
    const user = await createUser(email);
    const token = await authenticateUser(user);
    const academicYear = await CreateAcademicYear(user);
    const quarter = await createQuarter(academicYear);

    const response = await supertest(app)
      .get('/quarters/get/academicyear')
      .set('authorization', 'Bearer ' + token)
      .send({
        academicYearId: academicYear.id,
      });
    const responseBody = JSON.parse(response.text);

    expect(response.status).toBe(200);
    expect(responseBody.length).toBe(1);
    expect(responseBody[0].academyYearId).toBe(academicYear.id);
  });
});
