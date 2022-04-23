import { Request, Response } from 'express';
import { validateInput } from 'infra/http/errors/validation';
import { container } from 'tsyringe';
import { createQuarterDTO } from '../dtos/CreateQuarterDTO';
import { CreateQuarterService } from '../services/CreateQuarterService';

export class CreateQuarterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { academicYearId, startDate, endDate } = request.body;

    const createQuarterDto = await validateInput(createQuarterDTO, { academicYearId, startDate, endDate });
    await container.resolve(CreateQuarterService).execute(createQuarterDto);

    return response.status(201).send();
  }
}
