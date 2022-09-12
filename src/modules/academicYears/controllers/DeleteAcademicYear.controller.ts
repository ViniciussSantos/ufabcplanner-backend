import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { DeleteAcademyYearDTO } from '../dtos/DeleteAcademyYea.dto';
import { DeleteAcademicYearService } from '../services/DeleteAcademicYear.service';

export class DeleteAcademicYearController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: academicYearId } = request.params;

    const { id: userId } = request.user;

    const createAcademicYearService = container.resolve(DeleteAcademicYearService);

    const deleteAcademyYearDTO = await transformAndValidate(DeleteAcademyYearDTO, { academicYearId });

    await createAcademicYearService.execute(deleteAcademyYearDTO, userId);

    return response.status(204).send();
  }
}
