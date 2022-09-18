import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { CreateClassDTO } from '../dtos/CreateClass.dto';
import { ICreateClass } from '../dtos/interfaces/ICreateClass';
import { CreateClassService } from '../services/CreateClass.service';

@singleton()
export class CreateClassController {
  constructor(private createClassService: CreateClassService) {}

  async handle(request: Request, response: Response) {
    const requestBody = request.body as Omit<ICreateClass, 'userId'>;
    const { id: userId } = request.user;

    const createClassDTO = await transformAndValidate(CreateClassDTO, { userId, ...requestBody });

    this.createClassService.execute(createClassDTO);

    return response.status(201).send();
  }
}
