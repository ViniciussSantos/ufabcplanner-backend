import { Request, Response } from 'express';
import { validateInput } from 'infra/http/errors/validation';
import { container } from 'tsyringe';
import { GetClassesBySubjectIdDTO } from '../dtos/GetClassesBySubjectId.dto';
import { GetClassesBySubjectIdService } from '../services/GetClassesBySubjectIdService';

export class GetClassesBySubjectIdController {
  async execute(request: Request, response: Response) {
    const { id } = request.params;

    const getClassesBySubjectIdDTO = await validateInput(GetClassesBySubjectIdDTO, { id });

    const classes = await container.resolve(GetClassesBySubjectIdService).handle(getClassesBySubjectIdDTO);

    return response.json(classes).send();
  }
}
