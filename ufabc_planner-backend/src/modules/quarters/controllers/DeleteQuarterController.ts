import { Request, Response } from 'express';
import { validateInput } from 'infra/http/errors/validation';
import { container } from 'tsyringe';
import { DeleteQuarterDTO } from '../dtos/DeleteQuarter.dto';
import { DeleteQuarterService } from '../services/DeleteQuarterService';

export class DeleteQuarterController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteQuarterDto = await validateInput(DeleteQuarterDTO, { id });

    await container.resolve(DeleteQuarterService).execute(deleteQuarterDto);

    return response.status(204).send();
  }
}
