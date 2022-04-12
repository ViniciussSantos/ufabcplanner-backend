import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetAcademicYearByUserIdService } from '../services/GetAcademicYearByUserIdService';

export class GetAcademicYearByUserIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;

    const getAcademicYearByUserIdService = container.resolve(GetAcademicYearByUserIdService);

    const academicYears = await getAcademicYearByUserIdService.execute(userId);

    return response.json(academicYears).send();
  }
}
