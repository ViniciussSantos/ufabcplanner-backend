import { Request, Response } from 'express';
import { validateInput } from 'infra/http/errors/validation';
import { container } from 'tsyringe';
import { CreateTaskDTO } from '../dtos/CreateTask.dto';
import { ICreateTask } from '../dtos/interfaces/ICreateTask';
import { CreateTaskService } from '../services/CreateTaskService';

export class CreateTaskController {
  async execute(request: Request, response: Response) {
    const requestBody = request.body as Omit<ICreateTask, 'userId'>;
    const { id: userId } = request.user;

    const createTaskDTO = await validateInput(CreateTaskDTO, { userId, ...requestBody });

    await container.resolve(CreateTaskService).handle(createTaskDTO);

    return response.status(201).send();
  }
}
