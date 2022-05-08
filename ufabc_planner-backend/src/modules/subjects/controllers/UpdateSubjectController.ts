import { Request, Response } from 'express';
import { validateInput } from 'infra/http/errors/validation';
import { container } from 'tsyringe';
import { UpdateSubjectDTO } from '../dtos/UpdateSubject.dto';
import { UpdateSubjectService } from '../services/UpdateSubjectService';

export class UpdateSubjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description } = request.body;

    const UpdateSubjectDto = await validateInput(UpdateSubjectDTO, {
      id,
      name,
      description,
    });

    container.resolve(UpdateSubjectService).execute(UpdateSubjectDto);

    return response.status(204).send();
  }
}
