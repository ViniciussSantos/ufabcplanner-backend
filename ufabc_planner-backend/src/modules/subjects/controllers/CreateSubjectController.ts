import { Request, Response } from 'express';
import { validateInput } from 'infra/http/errors/validation';
import { container } from 'tsyringe';
import { CreateSubjectDTO } from '../dtos/CreateSubject.dto';
import { CreateSubjectService } from '../services/CreateSubjectService';

export class CreateSubjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { quarterId, name, description } = request.body;

    const createSubjectDto = await validateInput(CreateSubjectDTO, { quarterId, name, description });
    await container.resolve(CreateSubjectService).execute(createSubjectDto);

    return response.status(201).send();
  }
}
