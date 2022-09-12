import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { container } from 'tsyringe';
import { GetTasksByUserIdDTO } from '../dtos/GetTasksByUserId.dto';
import { GetTasksByUserIdService } from '../services/GetTasksByUserId.service';

export class GetTasksByUserIdController {
  async execute(request: Request, response: Response) {
    const { id } = request.user;

    const getTasksByUserIdDTO = await transformAndValidate(GetTasksByUserIdDTO, { id });

    const tasks = await container.resolve(GetTasksByUserIdService).handle(getTasksByUserIdDTO);

    response.json(tasks).send();
  }
}
