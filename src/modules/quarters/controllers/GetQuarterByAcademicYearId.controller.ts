import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { GetQuarterByAcademicYearIdDTO } from '../dtos/GetQuarterByAcademicYearId.dto';
import { GetQuarterByAcademicYearIdService } from '../services/GetQuarterByAcademicYearId.service';

@singleton()
export class GetQuarterByAcademicYearIdController {
  constructor(private getQuarterByAcademicYearIdService: GetQuarterByAcademicYearIdService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id: academicYearId } = request.params;

    const GetQuarterByAcademicYearIdDto = await transformAndValidate(GetQuarterByAcademicYearIdDTO, { academicYearId });

    const quarters = await this.getQuarterByAcademicYearIdService.execute(GetQuarterByAcademicYearIdDto);

    return response.json(quarters).send();
  }
}
