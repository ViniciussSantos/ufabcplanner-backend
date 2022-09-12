import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, closeConnection } from '../../database';
import { createAcademicYear } from '../../entities/AcademicYearFactory';
import { createQuarter } from '../../entities/QuarterFactory';
import { createSubject } from '../../entities/SubjectFactory';
import { createUser, authenticateUser } from '../../entities/UserFactory';

describe('Create class (e2e)', () => {
  beforeAll(async () => {
    await deleteAll();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it('Should create a class successfully', async () => {
    const user = await createUser();
    const token = authenticateUser(user);
    const academicYear = await createAcademicYear(user);
    const quarter = await createQuarter(academicYear);
    const subject = await createSubject(quarter, user);

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
