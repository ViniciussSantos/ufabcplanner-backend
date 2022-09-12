import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { container } from 'tsyringe';
import { GetExamsBySubjectIdDTO } from '../dtos/GetExamsBySubjectId.dto';
import { GetExamsBySubjectIdService } from '../services/GetExamsBySubjectId.service';

export class GetExamsBySubjectIdController {
  async execute(request: Request, response: Response) {
    const { id } = request.params;

    const getExamsBySubjectIdDTO = await transformAndValidate(GetExamsBySubjectIdDTO, { id });

    const exams = await container.resolve(GetExamsBySubjectIdService).handle(getExamsBySubjectIdDTO);

    return response.json(exams).send();
  }
}
