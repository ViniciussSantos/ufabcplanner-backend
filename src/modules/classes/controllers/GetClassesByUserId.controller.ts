import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { GetClassesByUserIdDTO } from '../dtos/GetClassesByUserId.dto';
import { GetClassesByUserIdService } from '../services/GetClassesByUserId.service';

@singleton()
export class GetClassesByUserIdController {
  constructor(private getClassesByUserIdService: GetClassesByUserIdService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const getClassesByUserIdDTO = await transformAndValidate(GetClassesByUserIdDTO, { id });

    const classes = await this.getClassesByUserIdService.execute(getClassesByUserIdDTO);

    response.json(classes).send();
  }
}
