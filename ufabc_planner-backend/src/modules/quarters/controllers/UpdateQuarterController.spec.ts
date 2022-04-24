import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, disconnect } from '../../../../test/database';
import { CreateAcademicYear } from '../../../../test/entities/AcademicYearFactory';
import { createQuarter } from '../../../../test/entities/QuarterFactory';
import { createUser, authenticateUser } from '../../../../test/entities/UserFactory';

describe('Update Quarter (e2e)', () => {
  beforeAll(async () => {
    deleteAll();
  });

  afterAll(async () => {
    disconnect();
  });

  it('should update the quarter successfully', async () => {
    const user = await createUser();
    const token = await authenticateUser(user);
    const academicYear = await CreateAcademicYear(user);
    const quarter = await createQuarter(academicYear);

    const response = await supertest(app)
      .put('/quarters/update/' + quarter.id)
      .set('authorization', 'Bearer ' + token)
      .send({
        startDate: '2022-10-01',
        endDate: '2022-11-01',
      });

    expect(response.status).toBe(204);
  });
});
