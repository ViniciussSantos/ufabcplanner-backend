import { Request, Response } from 'express';
import { validateInput } from 'infra/http/errors/validation';
import { container } from 'tsyringe';
import { IUpdateClass } from '../dtos/interfaces/IUpdateClass';
import { UpdateClassDTO } from '../dtos/UpdateClass.dto';
import { UpdateClassService } from '../services/UpdateClass.service';

export class UpdateClassController {
  async execute(request: Request, response: Response) {
    const responseBody = request.body as Omit<IUpdateClass, 'id'>;
    const { id } = request.params;

    const updateClassDTO = await validateInput(UpdateClassDTO, { id, ...responseBody });

    await container.resolve(UpdateClassService).handle(updateClassDTO);

    return response.status(204).send();
  }
}
