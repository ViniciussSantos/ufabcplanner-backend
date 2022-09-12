import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { container } from 'tsyringe';
import { IUpdateExam } from '../dtos/interfaces/IUpdateExam';
import { UpdateExamDTO } from '../dtos/UpdateExam.dto';
import { UpdateExamService } from '../services/UpdateExam.service';

export class UpdateExamController {
  async execute(request: Request, response: Response) {
    const responseBody = request.body as Omit<IUpdateExam, 'id'>;
    const { id } = request.params;

    const updateExamDTO = await transformAndValidate(UpdateExamDTO, { id, ...responseBody });

    await container.resolve(UpdateExamService).handle(updateExamDTO);

    return response.status(204).send();
  }
}
