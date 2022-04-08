import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateAcademicYearService } from '../services/CreateAcademicYearService';

export class CreateAcademyYearController {
  async handle(request: Request, response: Response) {
    const { year, startDate, endDate } = request.body;
    const { id } = request.user;

    const createAcademicYearService = container.resolve(CreateAcademicYearService);

    await createAcademicYearService.execute({ id, year, startDate, endDate });

    return response.status(201).send();
  }
}
