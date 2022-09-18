import { Request, Response } from 'express';
import { singleton } from 'tsyringe';
import { GetAcademicYearByUserIdService } from '../services/GetAcademicYearByUserId.service';

@singleton()
export class GetAcademicYearByUserIdController {
  constructor(private getAcademicYearByUserIdService: GetAcademicYearByUserIdService) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;

    const academicYears = await this.getAcademicYearByUserIdService.execute(userId);

    return response.json(academicYears).send();
  }
}
