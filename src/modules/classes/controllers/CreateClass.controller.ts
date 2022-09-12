import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { container } from 'tsyringe';
import { CreateClassDTO } from '../dtos/CreateClass.dto';
import { ICreateClass } from '../dtos/interfaces/ICreateClass';
import { CreateClassService } from '../services/CreateClass.service';

export class CreateClassController {
  async execute(request: Request, response: Response) {
    const requestBody = request.body as Omit<ICreateClass, 'userId'>;
    const { id: userId } = request.user;

    const createClassDTO = await transformAndValidate(CreateClassDTO, { userId, ...requestBody });

    await container.resolve(CreateClassService).handle(createClassDTO);

    return response.status(201).send();
  }
}
