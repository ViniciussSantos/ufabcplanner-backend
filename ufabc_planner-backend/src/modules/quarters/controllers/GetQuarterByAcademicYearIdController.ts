import { Request, Response } from 'express';
import { validateInput } from 'infra/http/errors/validation';
import { container } from 'tsyringe';
import { GetQuarterByAcademicYearIdDTO } from '../dtos/GetQuarterByAcademicYearIdDTO';
import { GetQuarterByAcademicYearIdService } from '../services/GetQuarterByAcademicYearIdService';

export class GetQuarterByAcademicYearIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: academicYearId } = request.params;

    const GetQuarterByAcademicYearIdDto = await validateInput(GetQuarterByAcademicYearIdDTO, { academicYearId });

    const quarters = await container.resolve(GetQuarterByAcademicYearIdService).execute(GetQuarterByAcademicYearIdDto);

    return response.json(quarters).send();
  }
}
