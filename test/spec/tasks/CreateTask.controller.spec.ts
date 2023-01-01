import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, closeConnection } from '../../database';
import { createAcademicYear } from '../../entities/AcademicYearFactory';
import { createQuarter } from '../../entities/QuarterFactory';
import { createSubject } from '../../entities/SubjectFactory';
import { getFirstTaskBySubjectId } from '../../entities/TaskFactory';
import { createUser, authenticateUser } from '../../entities/UserFactory';

describe('Create task (e2e)', () => {
  beforeAll(async () => {
    await deleteAll();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it('Should create a task successfully', async () => {
    const user = await createUser();
    const token = authenticateUser(user);
    const academicYear = await createAcademicYear(user);
    const quarter = await createQuarter(academicYear);
    const subject = await createSubject(quarter, user);

    const response = await supertest(app)
      .post('/tasks/')
      .set('authorization', 'Bearer ' + token)
      .send({
        subjectId: subject.id,
        title: 'titulo de teste para uma task',
        dueDate: '2022-09-09',
        description: 'descrição de teste para uma task',
      });

    expect(response.status).toBe(201);

    const createdTask = await getFirstTaskBySubjectId(subject.id);

    expect(createdTask).toBeTruthy();
  });
});
