import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { createQuarterDTO } from '../dtos/CreateQuarter.dto.';
import { CreateQuarterService } from '../services/CreateQuarter.service';

@singleton()
export class CreateQuarterController {
  constructor(private createQuarterService: CreateQuarterService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { academicYearId, startDate, endDate } = request.body;
    const { id: userId } = request.user;

    const createQuarterDto = await transformAndValidate(createQuarterDTO, { academicYearId, userId, startDate, endDate });

    await this.createQuarterService.execute(createQuarterDto);

    return response.status(201).send();
  }
}
