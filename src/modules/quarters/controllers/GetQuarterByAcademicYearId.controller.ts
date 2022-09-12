import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { container } from 'tsyringe';
import { GetQuarterByAcademicYearIdDTO } from '../dtos/GetQuarterByAcademicYearId.dto';
import { GetQuarterByAcademicYearIdService } from '../services/GetQuarterByAcademicYearId.service';

export class GetQuarterByAcademicYearIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: academicYearId } = request.params;

    const GetQuarterByAcademicYearIdDto = await transformAndValidate(GetQuarterByAcademicYearIdDTO, { academicYearId });

    const quarters = await container.resolve(GetQuarterByAcademicYearIdService).execute(GetQuarterByAcademicYearIdDto);

    return response.json(quarters).send();
  }
}
