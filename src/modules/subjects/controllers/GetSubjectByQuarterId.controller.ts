import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { container } from 'tsyringe';
import { GetSubjectByQuarterIdDTO } from '../dtos/GetSubjectByQuarterId.dto';
import { GetSubjectByQuarterIdService } from '../services/GetSubjectByQuarterId.service';

export class GetSubjectByQuarterIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: quarterId } = request.params;

    const GetSubjectByQuarterIdDto = await transformAndValidate(GetSubjectByQuarterIdDTO, { quarterId });

    const quarters = await container.resolve(GetSubjectByQuarterIdService).execute(GetSubjectByQuarterIdDto);

    return response.json(quarters).send();
  }
}
