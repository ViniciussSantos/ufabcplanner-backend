import { Request, Response } from 'express';
import { validateInput } from 'infra/http/errors/validation';
import { container } from 'tsyringe';
import { GetSubjectByUserIdDTO } from '../dtos/GetSubjectByUserId.dto';
import { GetSubjectByUserIdService } from '../services/GetSubjectByUserIdService';

export class GetSubjectByUserIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const GetSubjectByUserIdDto = await validateInput(GetSubjectByUserIdDTO, { id });

    const subjects = await container.resolve(GetSubjectByUserIdService).execute(GetSubjectByUserIdDto);

    return response.json(subjects).send();
  }
}
