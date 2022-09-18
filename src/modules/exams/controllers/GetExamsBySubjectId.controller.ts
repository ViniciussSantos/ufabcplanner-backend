import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { GetExamsBySubjectIdDTO } from '../dtos/GetExamsBySubjectId.dto';
import { GetExamsBySubjectIdService } from '../services/GetExamsBySubjectId.service';

@singleton()
export class GetExamsBySubjectIdController {
  constructor(private getExamsBySubjectIdService: GetExamsBySubjectIdService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const getExamsBySubjectIdDTO = await transformAndValidate(GetExamsBySubjectIdDTO, { id });

    const exams = await this.getExamsBySubjectIdService.execute(getExamsBySubjectIdDTO);

    return response.json(exams).send();
  }
}
