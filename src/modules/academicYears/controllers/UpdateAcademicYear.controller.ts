import { Request, Response } from 'express';
import { singleton } from 'tsyringe';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { UpdateAcademyYearDTO } from '../dtos/UpdateAcademicYear.dto';
import { UpdateAcademicYearService } from '../services/UpdateAcademicYear.service';

@singleton()
export class UpdateAcademicYearController {
  constructor(private updateAcademicYearService: UpdateAcademicYearService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { year, startDate, endDate } = request.body;
    const { id } = request.params;

    const updateAcademicYearDTO = await transformAndValidate(UpdateAcademyYearDTO, {
      id,
      year,
      startDate,
      endDate,
    });

    await this.updateAcademicYearService.execute(updateAcademicYearDTO);

    return response.status(204).send();
  }
}
