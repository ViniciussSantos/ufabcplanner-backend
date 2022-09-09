import { Request, Response } from 'express';
import { validateInput } from 'infra/http/errors/validation';
import { container } from 'tsyringe';
import { DeleteClassDTO } from '../dtos/DeleteClass.dto';
import { DeleteClassService } from '../services/DeleteClass.service';

export class DeleteClassController {
  async execute(request: Request, response: Response) {
    const { id } = request.params;

    const deleteClassDto = await validateInput(DeleteClassDTO, { id });

    await container.resolve(DeleteClassService).handle(deleteClassDto);

    return response.status(204).send();
  }
}
