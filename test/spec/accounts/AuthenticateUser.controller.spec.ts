import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, closeConnection } from '../../database';
import { createUser } from '../../entities/UserFactory';

describe('Create User (e2e)', () => {
  beforeAll(async () => {
    await deleteAll();
  });

  afterAll(async () => {
    await closeConnection();
  });
  it('should authenticate user correctly', async () => {
    const user = await createUser();

    const response = await supertest(app).post('/users/login').send({
      email: user.email,
      password: '123',
    });

    expect(response.status).toBe(200);
  });
});
