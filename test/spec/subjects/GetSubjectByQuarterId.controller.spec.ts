import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, closeConnection } from '../../database';
import { createAcademicYear } from '../../entities/AcademicYearFactory';
import { createQuarter } from '../../entities/QuarterFactory';
import { createSubject } from '../../entities/SubjectFactory';
import { createUser, authenticateUser } from '../../entities/UserFactory';

describe('get subject by quarter id (e2e)', () => {
  beforeAll(async () => {
    await deleteAll();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it('should return an array of subjects', async () => {
    const user = await createUser();
    const token = authenticateUser(user);
    const academicYear = await createAcademicYear(user);
    const quarter = await createQuarter(academicYear);
    const subject = await createSubject(quarter, user);

    const response = await supertest(app)
      .get('/subjects/get/quarter/' + quarter.id)
      .set('authorization', 'Bearer ' + token)
      .send({
        quarterId: quarter.id,
      });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].id).toBe(subject.id);
  });
});
