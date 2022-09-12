import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, closeConnection } from '../../database';
import { createAcademicYear } from '../../entities/AcademicYearFactory';
import { createQuarter } from '../../entities/QuarterFactory';
import { createSubject } from '../../entities/SubjectFactory';
import { createTask } from '../../entities/TaskFactory';
import { createUser, authenticateUser } from '../../entities/UserFactory';

describe('Get tasks by subject Id (e2e)', () => {
  beforeAll(async () => {
    await deleteAll();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it('Should return a task successfully using the subject id', async () => {
    const user = await createUser();
    const token = authenticateUser(user);
    const academicYear = await createAcademicYear(user);
    const quarter = await createQuarter(academicYear);
    const subject = await createSubject(quarter, user);

    await createTask(subject, user);

    const response = await supertest(app)
      .get('/tasks/get/subject/' + subject.id)
      .set('authorization', 'Bearer ' + token);

    const responseBody = JSON.parse(response.text);

    expect(response.status).toBe(200);
    expect(responseBody.length).toBe(1);
  });
});
