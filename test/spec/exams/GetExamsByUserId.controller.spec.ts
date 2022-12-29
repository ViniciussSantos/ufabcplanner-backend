import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, closeConnection } from '../../database';
import { createAcademicYear } from '../../entities/AcademicYearFactory';
import { createExam } from '../../entities/ExamFactory';
import { createQuarter } from '../../entities/QuarterFactory';
import { createSubject } from '../../entities/SubjectFactory';
import { createUser, authenticateUser } from '../../entities/UserFactory';

describe('Get exams by user id (e2e)', () => {
  beforeAll(async () => {
    await deleteAll();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it('Should return a exam successfully using the user id', async () => {
    const user = await createUser();
    const token = authenticateUser(user);
    const academicYear = await createAcademicYear(user);
    const quarter = await createQuarter(academicYear);
    const subject = await createSubject(quarter, user);
    const exam = await createExam(subject, user);

    const response = await supertest(app)
      .get('/exams/get/user')
      .set('authorization', 'Bearer ' + token);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].id).toBe(exam.id);
  });
});
