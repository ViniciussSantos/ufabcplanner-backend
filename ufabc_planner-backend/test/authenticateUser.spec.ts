import { app } from 'infra/app';
import request from 'supertest';
import { validPassword } from './utils/constants';
import { closeConnections } from './utils/database';
import { createRandomUser } from './utils/entities/User';

afterAll(() => {
  closeConnections();
});

describe('authenticate user', () => {
  it('Should be authenticated sucessfully', async () => {
    const user = await createRandomUser();

    const response = await request(app).post('/users/login').send({
      email: user.email,
      password: validPassword,
    });
    expect(response.body).toHaveProperty('token');
    expect(response.status).toBe(200);
  });
});
