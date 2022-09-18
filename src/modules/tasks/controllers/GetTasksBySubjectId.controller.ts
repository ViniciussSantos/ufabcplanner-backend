import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { GetTasksBySubjectIdDTO } from '../dtos/GetTasksBySubjecId.dto';
import { GetTasksBySubjectIdService } from '../services/GetTasksBySubjectId.service';

@singleton()
export class GetTasksBySubjectIdController {
  constructor(private getTasksBySubjectIdService: GetTasksBySubjectIdService) {}
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const getTasksBySubjectIdDTO = await transformAndValidate(GetTasksBySubjectIdDTO, { id });

    const tasks = await this.getTasksBySubjectIdService.execute(getTasksBySubjectIdDTO);

    return response.json(tasks).send();
  }
}
