import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { CreateAcademyYearDTO } from '../dtos/CreateAcademyYear.dto';
import { CreateAcademicYearService } from '../services/CreateAcademicYear.service';

@singleton()
export class CreateAcademicYearController {
  constructor(private createAcademicYearService: CreateAcademicYearService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { year, startDate, endDate } = request.body;
    const { id } = request.user;

    const createAcademicYearDTO = await transformAndValidate(CreateAcademyYearDTO, { userId: id, year, startDate, endDate });

    await this.createAcademicYearService.execute(createAcademicYearDTO);

    return response.status(201).send();
  }
}
