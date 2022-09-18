import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { DeleteQuarterDTO } from '../dtos/DeleteQuarter.dto';
import { DeleteQuarterService } from '../services/DeleteQuarter.service';

@singleton()
export class DeleteQuarterController {
  constructor(private deleteQuarterService: DeleteQuarterService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteQuarterDto = await transformAndValidate(DeleteQuarterDTO, { id });

    await this.deleteQuarterService.execute(deleteQuarterDto);

    return response.status(204).send();
  }
}
