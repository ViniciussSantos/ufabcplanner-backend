import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { container } from 'tsyringe';
import { GetExamsByUserIdDTO } from '../dtos/GetExamsByUserId.dto';
import { GetExamsByUserIdService } from '../services/GetExamsByUserId.service';

export class GetExamsByUserIdController {
  async execute(request: Request, response: Response) {
    const { id } = request.user;

    const getExamsByUserIdDTO = await transformAndValidate(GetExamsByUserIdDTO, { id });

    const exams = await container.resolve(GetExamsByUserIdService).handle(getExamsByUserIdDTO);

    return response.json(exams).send();
  }
}
