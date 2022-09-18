import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { IUpdateExam } from '../dtos/interfaces/IUpdateExam';
import { UpdateExamDTO } from '../dtos/UpdateExam.dto';
import { UpdateExamService } from '../services/UpdateExam.service';

@singleton()
export class UpdateExamController {
  constructor(private updateExamService: UpdateExamService) {}

  async handle(request: Request, response: Response) {
    const responseBody = request.body as Omit<IUpdateExam, 'id'>;
    const { id } = request.params;

    const updateExamDTO = await transformAndValidate(UpdateExamDTO, { id, ...responseBody });

    await this.updateExamService.execute(updateExamDTO);

    return response.status(204).send();
  }
}
