import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, disconnect } from '../../../../test/database';
import { createAcademicYear } from '../../../../test/entities/AcademicYearFactory';
import { createQuarter } from '../../../../test/entities/QuarterFactory';
import { createSubject } from '../../../../test/entities/SubjectFactory';
import { authenticateUser, createUser } from '../../../../test/entities/UserFactory';

describe('Create class (e2e)', () => {
  beforeAll(async () => {
    deleteAll();
  });

  afterAll(async () => {
    disconnect();
  });

  it('Should create a class successfully', async () => {
    const user = await createUser();
    const token = await authenticateUser(user);
    const academicYear = await createAcademicYear(user);
    const quarter = await createQuarter(academicYear);
    const subject = await createSubject(quarter);

    const response = await supertest(app)
      .post('/classes/')
      .set('authorization', 'Bearer ' + token)
      .send({
        subjectId: subject.id,
        professor: 'Paulo Meirelles',
        room: 'A202',
        campus: 'Santo André',
        building: 'Bloco A',
        startTime: '10:00',
        endTime: '12:00',
        weekday: 'seg',
        biweeklyType: 'week1',
      });

    expect(response.status).toBe(201);
  });
});
