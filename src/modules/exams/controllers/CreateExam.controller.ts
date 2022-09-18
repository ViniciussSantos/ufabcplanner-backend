import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { CreateExamDTO } from '../dtos/CreateExam.dto';
import { ICreateExam } from '../dtos/interfaces/ICreateExam';
import { CreateExamService } from '../services/CreateExam.service';

@singleton()
export class CreateExamController {
  constructor(private createExamService: CreateExamService) {}

  async handle(request: Request, response: Response) {
    const requestBody = request.body as Omit<ICreateExam, 'userId'>;
    const { id: userId } = request.user;

    const createExamDTO = await transformAndValidate(CreateExamDTO, { userId, ...requestBody });

    await this.createExamService.execute(createExamDTO);

    return response.status(201).send();
  }
}
