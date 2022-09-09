import { Request, Response } from 'express';
import { validateInput } from 'infra/http/errors/validation';
import { container } from 'tsyringe';
import { DeleteExamDTO } from '../dtos/DeleteExam.dto';
import { DeleteExamService } from '../services/DeleteExam.service';

export class DeleteExamController {
  async execute(request: Request, response: Response) {
    const { id } = request.params;

    const deleteExamDto = await validateInput(DeleteExamDTO, { id });

    await container.resolve(DeleteExamService).handle(deleteExamDto);

    return response.status(204).send();
  }
}
