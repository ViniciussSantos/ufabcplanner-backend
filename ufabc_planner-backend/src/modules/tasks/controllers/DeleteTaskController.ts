import { Request, Response } from 'express';
import { validateInput } from 'infra/http/errors/validation';
import { container } from 'tsyringe';
import { DeleteTaskDTO } from '../dtos/DeleteTask.dto';
import { DeleteTaskService } from '../services/DeleteTaskService';

export class DeleteTaskController {
  async execute(request: Request, response: Response) {
    const { id } = request.params;

    const deleteTaskDto = await validateInput(DeleteTaskDTO, { id });

    await container.resolve(DeleteTaskService).handle(deleteTaskDto);

    return response.status(204).send();
  }
}
