import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, closeConnection } from '../../database';
import { createAcademicYear } from '../../entities/AcademicYearFactory';
import { createQuarter, getQuarterById } from '../../entities/QuarterFactory';
import { createUser, authenticateUser } from '../../entities/UserFactory';

describe('Delete Quarter (e2e)', () => {
  beforeAll(async () => {
    await deleteAll();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it('should delete a quarter successfully', async () => {
    const user = await createUser();
    const token = authenticateUser(user);
    const academicYear = await createAcademicYear(user);
    const quarter = await createQuarter(academicYear);

    const response = await supertest(app)
      .del('/quarters/delete/' + quarter.id)
      .set('authorization', 'Bearer ' + token);

    expect(response.status).toBe(204);

    const deletedQuarter = await getQuarterById(quarter.id);

    expect(deletedQuarter).toBeNull();
  });
});
