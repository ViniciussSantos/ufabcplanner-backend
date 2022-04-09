import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteAcademicYearService } from '../services/DeleteAcademicYearService';

export class CreateAcademyYearController {
  async handle(request: Request, response: Response) {
    const { id } = request.param;
    const { id: user_id } = request.user;

    const createAcademicYearService = container.resolve(DeleteAcademicYearService);

    await createAcademicYearService.delete(id, user_id);

    return response.status(204).send();
  }
}
