import { Request, Response } from 'express';
import { singleton } from 'tsyringe';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { AuthenticateUserDTO } from '../dtos/AuthenticateUser.dto';
import { AuthenticateUserService } from '../services/AuthenticateUser.service';

@singleton()
class AuthenticateUserController {
  constructor(private authenticateUserService: AuthenticateUserService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserDTO = await transformAndValidate(AuthenticateUserDTO, { email, password });

    const token = await this.authenticateUserService.execute(authenticateUserDTO);

    return response.json(token);
  }
}

export { AuthenticateUserController };
