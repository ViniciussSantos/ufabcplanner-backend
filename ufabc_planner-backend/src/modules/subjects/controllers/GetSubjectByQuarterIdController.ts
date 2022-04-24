import { Request, Response } from 'express';
import { validateInput } from 'infra/http/errors/validation';
import { container } from 'tsyringe';
import { GetSubjectByQuarterIdDTO } from '../dtos/GetSubjectByQuarterIdDTO';
import { GetSubjectByQuarterIdService } from '../services/GetSubjectByQuarterIdService';

export class GetSubjectByQuarterIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { quarterId } = request.body;

    const GetSubjectByQuarterIdDto = await validateInput(GetSubjectByQuarterIdDTO, { quarterId });

    const quarters = await container.resolve(GetSubjectByQuarterIdService).execute(GetSubjectByQuarterIdDto);

    return response.json(quarters).send();
  }
}
