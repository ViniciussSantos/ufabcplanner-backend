import { Request, Response } from 'express';
import { validateInput } from 'infra/http/errors/validation';
import { container } from 'tsyringe';
import { GetClassesBySubjectIdDTO } from '../dtos/GetClassesBySubjectId.dto';
import { GetClassesByUserIdService } from '../services/GetClassesByUserIdService';

export class GetClassesByUserIdController {
  async execute(request: Request, response: Response) {
    const { id } = request.user;

    const getClassesBySubjectIdDTO = await validateInput(GetClassesBySubjectIdDTO, { id });

    const classes = await container.resolve(GetClassesByUserIdService).handle(getClassesBySubjectIdDTO);

    response.json(classes).send();
  }
}
