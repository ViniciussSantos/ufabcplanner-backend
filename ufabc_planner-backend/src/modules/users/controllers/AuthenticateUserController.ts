import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { validateInput } from 'utils/errors/validation';
import { AuthenticateUserDTO } from '../dtos/AuthenticateUserDTO';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);
    const authenticateUserDTO = await validateInput(AuthenticateUserDTO, { email, password });

    const token = await authenticateUserService.execute(authenticateUserDTO);

    return response.json(token);
  }
}

export { AuthenticateUserController };
