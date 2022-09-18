import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { IUpdateTask } from '../dtos/interfaces/IUpdateTask';
import { UpdateTaskDTO } from '../dtos/UpdateTask.dto';
import { UpdateTaskService } from '../services/UpdateTask.service';

@singleton()
export class UpdateTaskController {
  constructor(private updateTaskService: UpdateTaskService) {}

  async handle(request: Request, response: Response) {
    const responseBody = request.body as Omit<IUpdateTask, 'id'>;
    const { id } = request.params;

    const updateTaskDTO = await transformAndValidate(UpdateTaskDTO, { id, ...responseBody });

    await this.updateTaskService.execute(updateTaskDTO);

    return response.status(204).send();
  }
}
