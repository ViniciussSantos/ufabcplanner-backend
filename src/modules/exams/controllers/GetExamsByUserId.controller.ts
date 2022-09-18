import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { GetExamsByUserIdDTO } from '../dtos/GetExamsByUserId.dto';
import { GetExamsByUserIdService } from '../services/GetExamsByUserId.service';

@singleton()
export class GetExamsByUserIdController {
  constructor(private getExamsByUserIdService: GetExamsByUserIdService) {}
  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const getExamsByUserIdDTO = await transformAndValidate(GetExamsByUserIdDTO, { id });

    const exams = await this.getExamsByUserIdService.execute(getExamsByUserIdDTO);

    return response.json(exams).send();
  }
}
