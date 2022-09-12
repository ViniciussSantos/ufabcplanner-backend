import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { container } from 'tsyringe';
import { UpdateQuarterDTO } from '../dtos/UpdateQuarter.dto';
import { UpdateQuarterService } from '../services/UpdateQuarter.service';

export class UpdateQuarterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { startDate, endDate } = request.body;

    const updateQuarterDto = await transformAndValidate(UpdateQuarterDTO, {
      id,
      startDate,
      endDate,
    });

    container.resolve(UpdateQuarterService).execute(updateQuarterDto);

    return response.status(204).send();
  }
}
