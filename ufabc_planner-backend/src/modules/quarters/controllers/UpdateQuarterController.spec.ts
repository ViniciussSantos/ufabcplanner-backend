import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, disconnect } from '../../../../test/database';
import { CreateAcademicYear } from '../../../../test/entities/AcademicYearFactory';
import { createQuarter } from '../../../../test/entities/QuarterFactory';
import { createUser, authenticateUser } from '../../../../test/entities/UserFactory';
import { generateRandomEmail } from '../../../../test/utils';

describe('Update Quarter (e2e)', () => {
  beforeAll(async () => {
    deleteAll();
  });

  afterAll(async () => {
    disconnect();
  });

  it('should update the quarter successfully', async () => {
    const email = generateRandomEmail();
    const user = await createUser(email);
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
