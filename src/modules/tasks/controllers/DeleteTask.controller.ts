import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { DeleteTaskDTO } from '../dtos/DeleteTask.dto';
import { DeleteTaskService } from '../services/DeleteTask.service';

@singleton()
export class DeleteTaskController {
  constructor(private deleteTaskService: DeleteTaskService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteTaskDto = await transformAndValidate(DeleteTaskDTO, { id });

    await this.deleteTaskService.execute(deleteTaskDto);

    return response.status(204).send();
  }
}
