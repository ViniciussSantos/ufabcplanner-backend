import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { UpdateSubjectDTO } from '../dtos/UpdateSubject.dto';
import { UpdateSubjectService } from '../services/UpdateSubject.service';

@singleton()
export class UpdateSubjectController {
  constructor(private updateSubjectService: UpdateSubjectService) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description } = request.body;

    const UpdateSubjectDto = await transformAndValidate(UpdateSubjectDTO, {
      id,
      name,
      description,
    });

    await this.updateSubjectService.execute(UpdateSubjectDto);

    return response.status(204).send();
  }
}
