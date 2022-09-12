import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { container } from 'tsyringe';
import { IUpdateTask } from '../dtos/interfaces/IUpdateTask';
import { UpdateTaskDTO } from '../dtos/UpdateTask.dto';
import { UpdateTaskService } from '../services/UpdateTask.service';

export class UpdateTaskController {
  async execute(request: Request, response: Response) {
    const responseBody = request.body as Omit<IUpdateTask, 'id'>;
    const { id } = request.params;

    const updateTaskDTO = await transformAndValidate(UpdateTaskDTO, { id, ...responseBody });

    await container.resolve(UpdateTaskService).handle(updateTaskDTO);

    return response.status(204).send();
  }
}
