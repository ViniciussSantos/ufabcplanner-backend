import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { container } from 'tsyringe';
import { createQuarterDTO } from '../dtos/CreateQuarter.dto.';
import { CreateQuarterService } from '../services/CreateQuarter.service';

export class CreateQuarterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { academicYearId, startDate, endDate } = request.body;

    const createQuarterDto = await transformAndValidate(createQuarterDTO, { academicYearId, startDate, endDate });

    await container.resolve(CreateQuarterService).execute(createQuarterDto);

    return response.status(201).send();
  }
}
