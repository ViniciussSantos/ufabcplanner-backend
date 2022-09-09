import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { validateInput } from 'infra/http/errors/validation';
import { AuthenticateUserDTO } from '../dtos/AuthenticateUser.dto';
import { AuthenticateUserService } from '../services/AuthenticateUser.service';

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
