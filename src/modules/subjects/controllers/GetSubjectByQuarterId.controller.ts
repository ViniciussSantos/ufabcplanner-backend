import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { GetSubjectByQuarterIdDTO } from '../dtos/GetSubjectByQuarterId.dto';
import { GetSubjectByQuarterIdService } from '../services/GetSubjectByQuarterId.service';

@singleton()
export class GetSubjectByQuarterIdController {
  constructor(private getSubjectByQuarterIdService: GetSubjectByQuarterIdService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id: quarterId } = request.params;

    const GetSubjectByQuarterIdDto = await transformAndValidate(GetSubjectByQuarterIdDTO, { quarterId });

    const subjects = await this.getSubjectByQuarterIdService.execute(GetSubjectByQuarterIdDto);

    return response.json(subjects).send();
  }
}
