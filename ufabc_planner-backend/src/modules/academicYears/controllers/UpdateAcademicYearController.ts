import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { validateInput } from 'utils/errors/validation';
import { UpdateAcademyYearDTO } from '../dtos/UpdateAcademicYearDTO';
import { UpdateAcademicYearService } from '../services/UpdateAcademicYearService';

export class UpdateAcademicYearController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { year, startDate, endDate } = request.body;
    const { id } = request.params;

    const updateAcademicYearService = container.resolve(UpdateAcademicYearService);

    const updateAcademicYearDTO = await validateInput(UpdateAcademyYearDTO, {
      id,
      year,
      start_date: startDate,
      end_date: endDate,
    });

    await updateAcademicYearService.execute(updateAcademicYearDTO);

    return response.status(204).send();
  }
}
