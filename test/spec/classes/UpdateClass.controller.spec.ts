import { BiweeklyType, Weekdays } from '@prisma/client';
import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, closeConnection } from '../../database';
import { createAcademicYear } from '../../entities/AcademicYearFactory';
import { createClass, getClassById } from '../../entities/ClassFactory';
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

  it('Should update a class successfully', async () => {
    const user = await createUser();
    const token = authenticateUser(user);
    const academicYear = await createAcademicYear(user);
    const quarter = await createQuarter(academicYear);
    const subject = await createSubject(quarter, user);
    const classConst = await createClass(user, subject);

    const response = await supertest(app)
      .put('/classes/update/' + classConst.id)
      .set('authorization', 'Bearer ' + token)
      .send({
        startTime: '09:00',
        endTime: '11:00',
        weekday: Weekdays.sex,
        biweeklyType: BiweeklyType.week2,
      });

    expect(response.status).toBe(204);
    const savedClass = await getClassById(classConst.id);

    expect(savedClass?.startTime).toBe('09:00');
    expect(savedClass?.endTime).toBe('11:00');
    expect(savedClass?.weekday).toBe(Weekdays.sex);
    expect(savedClass?.biweeklyType).toBe(BiweeklyType.week2);
  });
});
