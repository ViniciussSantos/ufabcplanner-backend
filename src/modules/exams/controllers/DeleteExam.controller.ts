import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { DeleteExamDTO } from '../dtos/DeleteExam.dto';
import { DeleteExamService } from '../services/DeleteExam.service';

@singleton()
export class DeleteExamController {
  constructor(private deleteExamService: DeleteExamService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteExamDto = await transformAndValidate(DeleteExamDTO, { id });

    await this.deleteExamService.execute(deleteExamDto);

    return response.status(204).send();
  }
}
