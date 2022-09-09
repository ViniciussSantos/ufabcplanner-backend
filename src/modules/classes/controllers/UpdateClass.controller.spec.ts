import { BiweeklyType, Weekdays } from '@prisma/client';
import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, disconnect } from '../../../../test/database';
import { createAcademicYear } from '../../../../test/entities/AcademicYearFactory';
import { createClass, getClassById } from '../../../../test/entities/ClassFactory';
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

  it('Should update a class successfully', async () => {
    const user = await createUser();
    const token = await authenticateUser(user);
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
