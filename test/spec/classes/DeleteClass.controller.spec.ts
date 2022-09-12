import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, closeConnection } from '../../database';
import { createAcademicYear } from '../../entities/AcademicYearFactory';
import { createClass } from '../../entities/ClassFactory';
import { createQuarter } from '../../entities/QuarterFactory';
import { createSubject } from '../../entities/SubjectFactory';
import { createUser, authenticateUser } from '../../entities/UserFactory';

describe('Delete class (e2e)', () => {
  beforeAll(async () => {
    await deleteAll();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it('Should delete a class successfully', async () => {
    const user = await createUser();
    const token = authenticateUser(user);
    const academicYear = await createAcademicYear(user);
    const quarter = await createQuarter(academicYear);
    const subject = await createSubject(quarter, user);
    const classConst = await createClass(user, subject);

    const response = await supertest(app)
      .delete('/classes/delete/' + classConst.id)
      .set('authorization', 'Bearer ' + token);

    expect(response.status).toBe(204);
  });
});
