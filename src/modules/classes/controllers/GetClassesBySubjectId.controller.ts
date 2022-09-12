import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { container } from 'tsyringe';
import { GetClassesBySubjectIdDTO } from '../dtos/GetClassesBySubjectId.dto';
import { GetClassesBySubjectIdService } from '../services/GetClassesBySubjectId.service';

export class GetClassesBySubjectIdController {
  async execute(request: Request, response: Response) {
    const { id } = request.params;

    const getClassesBySubjectIdDTO = await transformAndValidate(GetClassesBySubjectIdDTO, { id });

    const classes = await container.resolve(GetClassesBySubjectIdService).handle(getClassesBySubjectIdDTO);

    return response.json(classes).send();
  }
}
