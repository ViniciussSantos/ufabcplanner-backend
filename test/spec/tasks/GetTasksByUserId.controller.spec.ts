import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, closeConnection } from '../../database';
import { createAcademicYear } from '../../entities/AcademicYearFactory';
import { createQuarter } from '../../entities/QuarterFactory';
import { createSubject } from '../../entities/SubjectFactory';
import { createTask } from '../../entities/TaskFactory';
import { createUser, authenticateUser } from '../../entities/UserFactory';

describe('Get tasks by user Id (e2e)', () => {
  beforeAll(async () => {
    await deleteAll();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it('Should return a task successfully using the user id', async () => {
    const user = await createUser();
    const token = authenticateUser(user);
    const academicYear = await createAcademicYear(user);
    const quarter = await createQuarter(academicYear);
    const subject = await createSubject(quarter, user);

    await createTask(subject, user);

    const response = await supertest(app)
      .get('/tasks/get/user')
      .set('authorization', 'Bearer ' + token);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].subjectId).toBe(subject.id);
    expect(response.body[0].userId).toBe(user.id);
  });
});
