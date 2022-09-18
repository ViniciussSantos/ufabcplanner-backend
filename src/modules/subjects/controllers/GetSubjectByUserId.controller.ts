import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { GetSubjectByUserIdDTO } from '../dtos/GetSubjectByUserId.dto';
import { GetSubjectByUserIdService } from '../services/GetSubjectByUserId.service';

@singleton()
export class GetSubjectByUserIdController {
  constructor(private getSubjectByUserIdService: GetSubjectByUserIdService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const GetSubjectByUserIdDto = await transformAndValidate(GetSubjectByUserIdDTO, { id });

    const subjects = await this.getSubjectByUserIdService.execute(GetSubjectByUserIdDto);

    return response.json(subjects).send();
  }
}
