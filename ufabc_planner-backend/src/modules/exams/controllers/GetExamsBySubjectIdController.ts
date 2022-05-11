import { Request, Response } from 'express';
import { validateInput } from 'infra/http/errors/validation';
import { container } from 'tsyringe';
import { GetExamsBySubjectIdDTO } from '../dtos/GetExamsBySubjectId.dto';
import { GetExamsBySubjectIdService } from '../services/GetExamsBySubjectIdService';

export class GetExamsBySubjectIdController {
  async execute(request: Request, response: Response) {
    const { id } = request.params;

    const getExamsBySubjectIdDTO = await validateInput(GetExamsBySubjectIdDTO, { id });

    const exams = await container.resolve(GetExamsBySubjectIdService).handle(getExamsBySubjectIdDTO);

    return response.json(exams).send();
  }
}
