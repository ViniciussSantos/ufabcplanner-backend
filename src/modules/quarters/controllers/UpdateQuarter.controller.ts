import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { UpdateQuarterDTO } from '../dtos/UpdateQuarter.dto';
import { UpdateQuarterService } from '../services/UpdateQuarter.service';

@singleton()
export class UpdateQuarterController {
  constructor(private updateQuarterService: UpdateQuarterService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { startDate, endDate } = request.body;

    const updateQuarterDto = await transformAndValidate(UpdateQuarterDTO, {
      id,
      startDate,
      endDate,
    });

    await this.updateQuarterService.execute(updateQuarterDto);

    return response.status(204).send();
  }
}
