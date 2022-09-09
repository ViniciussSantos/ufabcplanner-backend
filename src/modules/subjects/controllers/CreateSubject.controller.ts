import { Request, Response } from 'express';
import { validateInput } from 'infra/http/errors/validation';
import { container } from 'tsyringe';
import { CreateSubjectDTO } from '../dtos/CreateSubject.dto';
import { ICreateSubject } from '../dtos/interfaces/ICreateSubject';
import { CreateSubjectService } from '../services/CreateSubject.service';

export class CreateSubjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const requestBody = request.body as Omit<ICreateSubject, 'userId'>;
    const { id: userId } = request.user;

    const createSubjectDto = await validateInput(CreateSubjectDTO, { userId, ...requestBody });

    await container.resolve(CreateSubjectService).execute(createSubjectDto);

    return response.status(201).send();
  }
}
