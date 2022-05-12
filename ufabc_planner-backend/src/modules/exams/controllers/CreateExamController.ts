import { Request, Response } from 'express';
import { validateInput } from 'infra/http/errors/validation';
import { container } from 'tsyringe';
import { CreateExamDTO } from '../dtos/CreateExam.dto';
import { ICreateExam } from '../dtos/interfaces/ICreateExam';
import { CreateExamService } from '../services/CreateExamService';

export class CreateExamController {
  async execute(request: Request, response: Response) {
    const requestBody = request.body as Omit<ICreateExam, 'userId'>;
    const { id: userId } = request.user;

    const createExamDTO = await validateInput(CreateExamDTO, { userId, ...requestBody });

    await container.resolve(CreateExamService).handle(createExamDTO);

    return response.status(201).send();
  }
}
