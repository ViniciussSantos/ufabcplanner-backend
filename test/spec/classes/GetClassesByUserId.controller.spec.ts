import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, closeConnection } from '../../database';
import { createAcademicYear } from '../../entities/AcademicYearFactory';
import { createClass } from '../../entities/ClassFactory';
import { createQuarter } from '../../entities/QuarterFactory';
import { createSubject } from '../../entities/SubjectFactory';
import { createUser, authenticateUser } from '../../entities/UserFactory';

describe('Get classes by user id (e2e)', () => {
  beforeAll(async () => {
    await deleteAll();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it('Should return a class successfully using the user id', async () => {
    const user = await createUser();
    const token = authenticateUser(user);
    const academicYear = await createAcademicYear(user);
    const quarter = await createQuarter(academicYear);
    const subject = await createSubject(quarter, user);

    await createClass(user, subject);

    const response = await supertest(app)
      .get('/classes/get/user')
      .set('authorization', 'Bearer ' + token);

    const responseBody = JSON.parse(response.text);

    expect(response.status).toBe(200);
    expect(responseBody.length).toBe(1);
  });
});
