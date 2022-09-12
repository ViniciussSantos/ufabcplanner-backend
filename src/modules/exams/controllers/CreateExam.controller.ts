import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { container } from 'tsyringe';
import { CreateExamDTO } from '../dtos/CreateExam.dto';
import { ICreateExam } from '../dtos/interfaces/ICreateExam';
import { CreateExamService } from '../services/CreateExam.service';

export class CreateExamController {
  async execute(request: Request, response: Response) {
    const requestBody = request.body as Omit<ICreateExam, 'userId'>;
    const { id: userId } = request.user;

    const createExamDTO = await transformAndValidate(CreateExamDTO, { userId, ...requestBody });

    await container.resolve(CreateExamService).handle(createExamDTO);

    return response.status(201).send();
  }
}
