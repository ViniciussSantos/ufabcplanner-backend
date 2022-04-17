import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { validateInput } from 'infra/http/errors/validation';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { CreateUserService } from '../services/CreateUserService';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const createUserDTO = await validateInput(CreateUserDTO, { name, email, password });

    await createUserService.execute(createUserDTO);

    return response.status(201).send();
  }
}
