import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, closeConnection } from '../../database';
import { createAcademicYear } from '../../entities/AcademicYearFactory';
import { createQuarter } from '../../entities/QuarterFactory';
import { createSubject } from '../../entities/SubjectFactory';
import { createTask, getTaskById } from '../../entities/TaskFactory';
import { createUser, authenticateUser } from '../../entities/UserFactory';

describe('Create class (e2e)', () => {
  beforeAll(async () => {
    await deleteAll();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it('Should update a class successfully', async () => {
    const user = await createUser();
    const token = authenticateUser(user);
    const academicYear = await createAcademicYear(user);
    const quarter = await createQuarter(academicYear);
    const subject = await createSubject(quarter, user);
    const task = await createTask(subject, user);

    const response = await supertest(app)
      .put('/tasks/update/' + task.id)
      .set('authorization', 'Bearer ' + token)
      .send({
        title: 'novo titulo de task',
        dueDate: '2022-08-02',
        description: 'nova descrição de task',
      });

    expect(response.status).toBe(204);
    const updatedTask = await getTaskById(task.id);

    expect(updatedTask?.title).toBe('novo titulo de task');
    expect(updatedTask?.dueDate.toISOString()).toBe('2022-08-02T00:00:00.000Z');
    expect(updatedTask?.description).toBe('nova descrição de task');
  });
});
