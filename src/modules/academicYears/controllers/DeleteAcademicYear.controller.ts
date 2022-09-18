import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { DeleteAcademyYearDTO } from '../dtos/DeleteAcademyYea.dto';
import { DeleteAcademicYearService } from '../services/DeleteAcademicYear.service';

@singleton()
export class DeleteAcademicYearController {
  constructor(private deleteAcademicYearService: DeleteAcademicYearService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id: academicYearId } = request.params;

    const { id: userId } = request.user;

    const deleteAcademyYearDTO = await transformAndValidate(DeleteAcademyYearDTO, { academicYearId });

    await this.deleteAcademicYearService.execute(deleteAcademyYearDTO, userId);

    return response.status(204).send();
  }
}
