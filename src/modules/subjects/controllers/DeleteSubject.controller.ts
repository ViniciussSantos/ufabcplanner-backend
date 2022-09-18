import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { DeleteSubjectDTO } from '../dtos/DeleteSubject.dto';
import { DeleteSubjectService } from '../services/DeleteSubject.service';

@singleton()
export class DeleteSubjectController {
  constructor(private deleteSubjectService: DeleteSubjectService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteSubjectDto = await transformAndValidate(DeleteSubjectDTO, { id });

    await this.deleteSubjectService.execute(deleteSubjectDto);

    return response.status(204).send();
  }
}
