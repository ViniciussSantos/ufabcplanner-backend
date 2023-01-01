import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, closeConnection } from '../../database';
import { createAcademicYear } from '../../entities/AcademicYearFactory';
import { createExam, getExamById } from '../../entities/ExamFactory';
import { createQuarter } from '../../entities/QuarterFactory';
import { createSubject } from '../../entities/SubjectFactory';
import { createUser, authenticateUser } from '../../entities/UserFactory';

describe('update exam(e2e)', () => {
  beforeAll(async () => {
    await deleteAll();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it('Should update a exam successfully', async () => {
    const user = await createUser();
    const token = authenticateUser(user);
    const academicYear = await createAcademicYear(user);
    const quarter = await createQuarter(academicYear);
    const subject = await createSubject(quarter, user);
    const exam = await createExam(subject, user);

    const response = await supertest(app)
      .put('/exams/update/' + exam.id)
      .set('authorization', 'Bearer ' + token)
      .send({ dueDate: '2022-08-08', time: '12:00' });

    const modifiedExam = await getExamById(exam.id);

    expect(response.status).toBe(204);
    expect(modifiedExam?.dueDate.toISOString().split('T')[0]).toBe('2022-08-08');
    expect(modifiedExam?.time).toBe('12:00');
  });
});
