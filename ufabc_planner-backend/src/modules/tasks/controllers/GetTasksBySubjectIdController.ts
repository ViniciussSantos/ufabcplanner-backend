import { Request, Response } from 'express';
import { validateInput } from 'infra/http/errors/validation';
import { container } from 'tsyringe';
import { GetTasksBySubjectIdDTO } from '../dtos/GetTasksBySubjecId.dto';
import { GetTasksBySubjectIdService } from '../services/GetTasksBySubjectIdService';

export class GetTasksBySubjectIdController {
  async execute(request: Request, response: Response) {
    const { id } = request.params;

    const getTasksBySubjectIdDTO = await validateInput(GetTasksBySubjectIdDTO, { id });

    const tasks = await container.resolve(GetTasksBySubjectIdService).handle(getTasksBySubjectIdDTO);

    return response.json(tasks).send();
  }
}
