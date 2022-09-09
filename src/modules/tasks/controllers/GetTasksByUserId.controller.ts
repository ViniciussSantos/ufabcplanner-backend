import { Request, Response } from 'express';
import { validateInput } from 'infra/http/errors/validation';
import { container } from 'tsyringe';
import { GetTasksByUserIdDTO } from '../dtos/GetTasksByUserId.dto';
import { GetTasksByUserIdService } from '../services/GetTasksByUserId.service';

export class GetTasksByUserIdController {
  async execute(request: Request, response: Response) {
    const { id } = request.user;

    const getTasksByUserIdDTO = await validateInput(GetTasksByUserIdDTO, { id });

    const tasks = await container.resolve(GetTasksByUserIdService).handle(getTasksByUserIdDTO);

    response.json(tasks).send();
  }
}
