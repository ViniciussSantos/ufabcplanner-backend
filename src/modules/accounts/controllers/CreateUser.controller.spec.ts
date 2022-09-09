import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, disconnect } from '../../../../test/database';
import { getUserByEmail } from '../../../../test/entities/UserFactory';

describe('Create User (e2e)', () => {
  beforeAll(async () => {
    await deleteAll();
  });

  afterAll(async () => {
    await disconnect();
  });
  it('should register user correctly', async () => {
    const response = await supertest(app).post('/users/').send({
      name: 'teste',
      email: 'teste@email.com',
      password: '123',
    });

    expect(response.status).toBe(201);

    const user = await getUserByEmail('teste@email.com');

    expect(user).toBeTruthy();
  });
});
