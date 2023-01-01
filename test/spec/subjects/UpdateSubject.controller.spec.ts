import { app } from 'infra/http/app';
import supertest from 'supertest';
import { deleteAll, closeConnection } from '../../database';
import { createAcademicYear } from '../../entities/AcademicYearFactory';
import { createQuarter } from '../../entities/QuarterFactory';
import { createSubject, getSubjectById } from '../../entities/SubjectFactory';
import { createUser, authenticateUser } from '../../entities/UserFactory';

describe('update subject (e2e)', () => {
  beforeAll(async () => {
    await deleteAll();
  });

  afterAll(async () => {
    await closeConnection();
  });

  it("should update the subject's name and description", async () => {
    const user = await createUser();
    const token = authenticateUser(user);
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

    const modifiedSubject = await getSubjectById(subject.id);

    expect(response.status).toBe(204);
    expect(modifiedSubject?.name).toBe('Paradigmas da programação');
    expect(modifiedSubject?.description).toBe('descrição teste');
  });
});
