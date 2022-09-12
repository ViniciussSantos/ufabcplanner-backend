import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { UpdateAcademyYearDTO } from '../dtos/UpdateAcademicYear.dto';
import { UpdateAcademicYearService } from '../services/UpdateAcademicYear.service';

export class UpdateAcademicYearController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { year, startDate, endDate } = request.body;
    const { id } = request.params;

    const updateAcademicYearService = container.resolve(UpdateAcademicYearService);

    const updateAcademicYearDTO = await transformAndValidate(UpdateAcademyYearDTO, {
      id,
      year,
      startDate,
      endDate,
    });

    await updateAcademicYearService.execute(updateAcademicYearDTO);

    return response.status(204).send();
  }
}
