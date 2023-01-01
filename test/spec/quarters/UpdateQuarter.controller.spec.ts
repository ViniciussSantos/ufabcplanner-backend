import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, closeConnection } from '../../database';
import { createAcademicYear } from '../../entities/AcademicYearFactory';
import { createQuarter, getQuarterById } from '../../entities/QuarterFactory';
import { createUser, authenticateUser } from '../../entities/UserFactory';

describe('Update Quarter (e2e)', () => {
  beforeAll(async () => {
    await deleteAll();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it('should update the quarter successfully', async () => {
    const user = await createUser();
    const token = authenticateUser(user);
    const academicYear = await createAcademicYear(user);
    const quarter = await createQuarter(academicYear);

    const response = await supertest(app)
      .put('/quarters/update/' + quarter.id)
      .set('authorization', 'Bearer ' + token)
      .send({
        startDate: '2022-10-01',
        endDate: '2022-11-01',
      });

    const modifiedQuarter = await getQuarterById(quarter.id);

    expect(response.status).toBe(204);
    expect(modifiedQuarter?.startDate.toISOString().split('T')[0]).toBe('2022-10-01');
    expect(modifiedQuarter?.endDate.toISOString().split('T')[0]).toBe('2022-11-01');
  });
});
