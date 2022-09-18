import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { GetTasksByUserIdDTO } from '../dtos/GetTasksByUserId.dto';
import { GetTasksByUserIdService } from '../services/GetTasksByUserId.service';

@singleton()
export class GetTasksByUserIdController {
  constructor(private getTasksByUserIdService: GetTasksByUserIdService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const getTasksByUserIdDTO = await transformAndValidate(GetTasksByUserIdDTO, { id });

    const tasks = await this.getTasksByUserIdService.execute(getTasksByUserIdDTO);

    response.json(tasks).send();
  }
}
