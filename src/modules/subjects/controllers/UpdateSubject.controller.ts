import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { container } from 'tsyringe';
import { UpdateSubjectDTO } from '../dtos/UpdateSubject.dto';
import { UpdateSubjectService } from '../services/UpdateSubject.service';

export class UpdateSubjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description } = request.body;

    const UpdateSubjectDto = await transformAndValidate(UpdateSubjectDTO, {
      id,
      name,
      description,
    });

    container.resolve(UpdateSubjectService).execute(UpdateSubjectDto);

    return response.status(204).send();
  }
}
