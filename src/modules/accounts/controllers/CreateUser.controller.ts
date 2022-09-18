import { Request, Response } from 'express';
import { singleton } from 'tsyringe';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { CreateUserDTO } from '../dtos/CreateUser.dto';
import { CreateUserService } from '../services/CreateUser.service';

@singleton()
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserDTO = await transformAndValidate(CreateUserDTO, { name, email, password });

    await this.createUserService.execute(createUserDTO);

    return response.status(201).send();
  }
}
