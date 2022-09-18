import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { IUpdateClass } from '../dtos/interfaces/IUpdateClass';
import { UpdateClassDTO } from '../dtos/UpdateClass.dto';
import { UpdateClassService } from '../services/UpdateClass.service';
@singleton()
export class UpdateClassController {
  constructor(private updateClassService: UpdateClassService) {}

  async handle(request: Request, response: Response) {
    const responseBody = request.body as Omit<IUpdateClass, 'id'>;
    const { id } = request.params;

    const updateClassDTO = await transformAndValidate(UpdateClassDTO, { id, ...responseBody });

    await this.updateClassService.execute(updateClassDTO);

    return response.status(204).send();
  }
}
