import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, disconnect } from '../../../../test/database';
import { createAcademicYear } from '../../../../test/entities/AcademicYearFactory';
import { createQuarter } from '../../../../test/entities/QuarterFactory';
import { createSubject } from '../../../../test/entities/SubjectFactory';
import { createUser, authenticateUser } from '../../../../test/entities/UserFactory';

describe('update subject (e2e)', () => {
  beforeAll(async () => {
    deleteAll();
  });

  afterAll(async () => {
    disconnect();
  });

  it("should update the subject's name and description", async () => {
    const user = await createUser();
    const token = await authenticateUser(user);
    const academicYear = await createAcademicYear(user);
    const quarter = await createQuarter(academicYear);
    const subject = await createSubject(quarter, user);

    const response = await supertest(app)
      .put('/subjects/update/' + subject.id)
      .set('authorization', 'Bearer ' + token)
      .send({
        name: 'Paradigmas da programação',
        description: 'descrição teste',
      });

    expect(response.status).toBe(204);
  });
});
