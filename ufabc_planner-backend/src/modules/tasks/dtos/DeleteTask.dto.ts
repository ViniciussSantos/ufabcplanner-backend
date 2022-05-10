import { IsUUID, IsNotEmpty } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { IDeleteTask } from './interfaces/IDeleteTask';

export class DeleteTaskDTO implements IDeleteTask {
  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  id: string;
}
