import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { validateInput } from 'utils/errors/validation';
import { DeleteAcademyYearDTO } from '../dtos/DeleteAcademyYearDTO';
import { DeleteAcademicYearService } from '../services/DeleteAcademicYearService';

export class DeleteAcademicYearController {
  async handle(request: Request, response: Response) {
    const { id: academicYearId } = request.params;

    const { id: userId } = request.user;

    const createAcademicYearService = container.resolve(DeleteAcademicYearService);

    const deleteAcademyYearDTO = await validateInput(DeleteAcademyYearDTO, { academicYearId });

    await createAcademicYearService.execute(deleteAcademyYearDTO, userId);

    return response.status(204).send();
  }
}
