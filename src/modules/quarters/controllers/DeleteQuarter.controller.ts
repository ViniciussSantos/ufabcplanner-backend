import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { container } from 'tsyringe';
import { DeleteQuarterDTO } from '../dtos/DeleteQuarter.dto';
import { DeleteQuarterService } from '../services/DeleteQuarter.service';

export class DeleteQuarterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteQuarterDto = await transformAndValidate(DeleteQuarterDTO, { id });

    await container.resolve(DeleteQuarterService).execute(deleteQuarterDto);

    return response.status(204).send();
  }
}
