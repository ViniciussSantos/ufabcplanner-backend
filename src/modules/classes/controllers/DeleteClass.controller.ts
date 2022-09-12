import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { container } from 'tsyringe';
import { DeleteClassDTO } from '../dtos/DeleteClass.dto';
import { DeleteClassService } from '../services/DeleteClass.service';

export class DeleteClassController {
  async execute(request: Request, response: Response) {
    const { id } = request.params;

    const deleteClassDto = await transformAndValidate(DeleteClassDTO, { id });

    await container.resolve(DeleteClassService).handle(deleteClassDto);

    return response.status(204).send();
  }
}
