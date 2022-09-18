import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { CreateSubjectDTO } from '../dtos/CreateSubject.dto';
import { ICreateSubject } from '../dtos/interfaces/ICreateSubject';
import { CreateSubjectService } from '../services/CreateSubject.service';

@singleton()
export class CreateSubjectController {
  constructor(private createSubjectService: CreateSubjectService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const requestBody = request.body as Omit<ICreateSubject, 'userId'>;
    const { id: userId } = request.user;

    const createSubjectDto = await transformAndValidate(CreateSubjectDTO, { userId, ...requestBody });

    await this.createSubjectService.execute(createSubjectDto);

    return response.status(201).send();
  }
}
