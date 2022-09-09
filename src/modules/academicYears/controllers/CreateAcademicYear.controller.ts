import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { validateInput } from 'infra/http/errors/validation';
import { CreateAcademyYearDTO } from '../dtos/CreateAcademyYear.dto';
import { CreateAcademicYearService } from '../services/CreateAcademicYear.service';

export class CreateAcademicYearController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { year, startDate, endDate } = request.body;
    const { id } = request.user;

    const createAcademicYearService = container.resolve(CreateAcademicYearService);

    const createAcademicYearDTO = await validateInput(CreateAcademyYearDTO, { userId: id, year, startDate, endDate });

    await createAcademicYearService.execute(createAcademicYearDTO);

    return response.status(201).send();
  }
}
