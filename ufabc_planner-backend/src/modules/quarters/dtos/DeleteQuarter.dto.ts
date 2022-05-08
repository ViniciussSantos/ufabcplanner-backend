import { IsNotEmpty, IsUUID } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { IDeleteQuarter } from './interfaces/IDeleteQuarter';

export class DeleteQuarterDTO implements IDeleteQuarter {
  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  id: string;
}
