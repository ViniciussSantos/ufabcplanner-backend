import { Request, Response } from 'express';
import { validateInput } from 'infra/http/errors/validation';
import { container } from 'tsyringe';
import { GetClassesBySubjectIdDTO } from '../dtos/GetClassesBySubjectId.dto';
import { GetClassesByUserIdDTO } from '../dtos/GetClassesByUserId.dto';
import { GetClassesByUserIdService } from '../services/GetClassesByUserId.service';

export class GetClassesByUserIdController {
  async execute(request: Request, response: Response) {
    const { id } = request.user;

    const getClassesByUserIdDTO = await validateInput(GetClassesByUserIdDTO, { id });

    const classes = await container.resolve(GetClassesByUserIdService).handle(getClassesByUserIdDTO);

    response.json(classes).send();
  }
}
