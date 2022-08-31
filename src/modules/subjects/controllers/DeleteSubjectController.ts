import { Request, Response } from 'express';
import { validateInput } from 'infra/http/errors/validation';
import { container } from 'tsyringe';
import { DeleteSubjectDTO } from '../dtos/DeleteSubject.dto';
import { DeleteSubjectService } from '../services/DeleteSubjectService';

export class DeleteSubjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteSubjectDto = await validateInput(DeleteSubjectDTO, { id });

    await container.resolve(DeleteSubjectService).execute(deleteSubjectDto);

    return response.status(204).send();
  }
}
