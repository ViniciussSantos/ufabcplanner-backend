import { Request, Response } from 'express';
import { validateInput } from 'infra/http/errors/validation';
import { container } from 'tsyringe';
import { GetExamsByUserIdDTO } from '../dtos/GetExamsByUserId.dto';
import { GetExamsByUserIdService } from '../services/GetExamsByUserId.service';

export class GetExamsByUserIdController {
  async execute(request: Request, response: Response) {
    const { id } = request.user;

    const getExamsByUserIdDTO = await validateInput(GetExamsByUserIdDTO, { id });

    const exams = await container.resolve(GetExamsByUserIdService).handle(getExamsByUserIdDTO);

    return response.json(exams).send();
  }
}
