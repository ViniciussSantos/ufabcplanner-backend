import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { singleton } from 'tsyringe';
import { DeleteClassDTO } from '../dtos/DeleteClass.dto';
import { DeleteClassService } from '../services/DeleteClass.service';

@singleton()
export class DeleteClassController {
  constructor(private deleteClassService: DeleteClassService) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteClassDto = await transformAndValidate(DeleteClassDTO, { id });

    await this.deleteClassService.execute(deleteClassDto);

    return response.status(204).send();
  }
}
