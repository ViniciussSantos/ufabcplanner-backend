import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, disconnect } from '../../../../test/database';
import { createAcademicYear } from '../../../../test/entities/AcademicYearFactory';
import { createExam } from '../../../../test/entities/ExamFactory';
import { createQuarter } from '../../../../test/entities/QuarterFactory';
import { createSubject } from '../../../../test/entities/SubjectFactory';
import { createUser, authenticateUser } from '../../../../test/entities/UserFactory';

describe('Delete exam (e2e)', () => {
  beforeAll(async () => {
    deleteAll();
  });

  afterAll(async () => {
    disconnect();
  });

  it('Should delete a exam successfully', async () => {
    const user = await createUser();
    const token = await authenticateUser(user);
    const academicYear = await createAcademicYear(user);
    const quarter = await createQuarter(academicYear);
    const subject = await createSubject(quarter, user);
    const exam = await createExam(subject, user);

    const response = await supertest(app)
      .delete('/exams/delete/' + exam.id)
      .set('authorization', 'Bearer ' + token);

    expect(response.status).toBe(204);
  });
});
