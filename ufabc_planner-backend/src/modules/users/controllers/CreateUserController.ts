import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserService } from '../services/CreateUserService';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    await createUserService.execute({
      name,
      email,
      password,
    });

    return response.status(201).send();
  }
}
