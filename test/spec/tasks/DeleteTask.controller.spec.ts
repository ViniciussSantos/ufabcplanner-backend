import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, closeConnection } from '../../database';
import { createAcademicYear } from '../../entities/AcademicYearFactory';
import { createQuarter } from '../../entities/QuarterFactory';
import { createSubject } from '../../entities/SubjectFactory';
import { createTask } from '../../entities/TaskFactory';
import { createUser, authenticateUser } from '../../entities/UserFactory';

describe('Delete task (e2e)', () => {
  beforeAll(async () => {
    await deleteAll();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it('Should delete a task successfully', async () => {
    const user = await createUser();
    const token = authenticateUser(user);
    const academicYear = await createAcademicYear(user);
    const quarter = await createQuarter(academicYear);
    const subject = await createSubject(quarter, user);
    const task = await createTask(subject, user);

    const response = await supertest(app)
      .delete('/tasks/delete/' + task.id)
      .set('authorization', 'Bearer ' + token);

    expect(response.status).toBe(204);
  });
});
