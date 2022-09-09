import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, disconnect } from '../../../../test/database';
import { createAcademicYear } from '../../../../test/entities/AcademicYearFactory';
import { createQuarter } from '../../../../test/entities/QuarterFactory';
import { createSubject } from '../../../../test/entities/SubjectFactory';
import { createTask } from '../../../../test/entities/TaskFactory';
import { createUser, authenticateUser } from '../../../../test/entities/UserFactory';

describe('Delete task (e2e)', () => {
  beforeAll(async () => {
    await deleteAll();
  });

  afterAll(async () => {
    await disconnect();
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
