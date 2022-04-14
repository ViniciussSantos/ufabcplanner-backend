import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { validateInput } from 'utils/errors/validation';
import { CreateAcademyYearDTO } from '../dtos/CreateAcademyYearDTO';
import { CreateAcademicYearService } from '../services/CreateAcademicYearService';

export class CreateAcademicYearController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { year, startDate, endDate } = request.body;
    const { id } = request.user;

    const createAcademicYearService = container.resolve(CreateAcademicYearService);

    const createAcademicYearDTO = await validateInput(CreateAcademyYearDTO, { id, year, startDate, endDate });

    await createAcademicYearService.execute(createAcademicYearDTO);

    return response.status(201).send();
  }
}
