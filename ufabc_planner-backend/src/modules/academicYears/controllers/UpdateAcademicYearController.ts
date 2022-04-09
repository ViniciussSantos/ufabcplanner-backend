import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateAcademicYearService } from '../services/UpdateAcademicYearService';

export class UpdateAcademyYearController {
  async handle(request: Request, response: Response) {
    const { year, startDate, endDate } = request.body;
    const { id } = request.user;

    const createAcademicYearService = container.resolve(UpdateAcademicYearService);

    await createAcademicYearService.execute({ id, year, startDate, endDate });

    return response.status(201).send();
  }
}
