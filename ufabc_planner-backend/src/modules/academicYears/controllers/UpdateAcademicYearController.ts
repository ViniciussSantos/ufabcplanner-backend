import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateAcademicYearService } from '../services/UpdateAcademicYearService';

export class UpdateAcademicYearController {
  async handle(request: Request, response: Response) {
    const { year, startDate, endDate } = request.body;
    const { id } = request.params;

    const updateAcademicYearService = container.resolve(UpdateAcademicYearService);

    await updateAcademicYearService.execute(id, { year, start_date: startDate, end_date: endDate});

    return response.status(204).send();
  }
}
