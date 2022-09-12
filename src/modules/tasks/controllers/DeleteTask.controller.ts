import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { container } from 'tsyringe';
import { DeleteTaskDTO } from '../dtos/DeleteTask.dto';
import { DeleteTaskService } from '../services/DeleteTask.service';

export class DeleteTaskController {
  async execute(request: Request, response: Response) {
    const { id } = request.params;

    const deleteTaskDto = await transformAndValidate(DeleteTaskDTO, { id });

    await container.resolve(DeleteTaskService).handle(deleteTaskDto);

    return response.status(204).send();
  }
}
