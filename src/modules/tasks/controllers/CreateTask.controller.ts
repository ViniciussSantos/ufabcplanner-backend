import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { CreateTaskDTO } from '../dtos/CreateTask.dto';
import { ICreateTask } from '../dtos/interfaces/ICreateTask';
import { CreateTaskService } from '../services/CreateTask.service';

@singleton()
export class CreateTaskController {
  constructor(private createTaskService: CreateTaskService) {}

  async handle(request: Request, response: Response) {
    const requestBody = request.body as Omit<ICreateTask, 'userId'>;
    const { id: userId } = request.user;

    const createTaskDTO = await transformAndValidate(CreateTaskDTO, { userId, ...requestBody });

    await this.createTaskService.execute(createTaskDTO);

    return response.status(201).send();
  }
}
