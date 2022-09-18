import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { GetClassesBySubjectIdDTO } from '../dtos/GetClassesBySubjectId.dto';
import { GetClassesBySubjectIdService } from '../services/GetClassesBySubjectId.service';
@singleton()
export class GetClassesBySubjectIdController {
  constructor(private getClassesBySubjectIdService: GetClassesBySubjectIdService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const getClassesBySubjectIdDTO = await transformAndValidate(GetClassesBySubjectIdDTO, { id });

    const classes = await this.getClassesBySubjectIdService.execute(getClassesBySubjectIdDTO);

    return response.json(classes).send();
  }
}
