import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { container } from 'tsyringe';
import { GetTasksBySubjectIdDTO } from '../dtos/GetTasksBySubjecId.dto';
import { GetTasksBySubjectIdService } from '../services/GetTasksBySubjectId.service';

export class GetTasksBySubjectIdController {
  async execute(request: Request, response: Response) {
    const { id } = request.params;

    const getTasksBySubjectIdDTO = await transformAndValidate(GetTasksBySubjectIdDTO, { id });

    const tasks = await container.resolve(GetTasksBySubjectIdService).handle(getTasksBySubjectIdDTO);

    return response.json(tasks).send();
  }
}
