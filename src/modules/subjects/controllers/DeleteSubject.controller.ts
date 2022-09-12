import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { container } from 'tsyringe';
import { DeleteSubjectDTO } from '../dtos/DeleteSubject.dto';
import { DeleteSubjectService } from '../services/DeleteSubject.service';

export class DeleteSubjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteSubjectDto = await transformAndValidate(DeleteSubjectDTO, { id });

    await container.resolve(DeleteSubjectService).execute(deleteSubjectDto);

    return response.status(204).send();
  }
}
