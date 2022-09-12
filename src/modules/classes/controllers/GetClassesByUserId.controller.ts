import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { container } from 'tsyringe';
import { GetClassesByUserIdDTO } from '../dtos/GetClassesByUserId.dto';
import { GetClassesByUserIdService } from '../services/GetClassesByUserId.service';

export class GetClassesByUserIdController {
  async execute(request: Request, response: Response) {
    const { id } = request.user;

    const getClassesByUserIdDTO = await transformAndValidate(GetClassesByUserIdDTO, { id });

    const classes = await container.resolve(GetClassesByUserIdService).handle(getClassesByUserIdDTO);

    response.json(classes).send();
  }
}
