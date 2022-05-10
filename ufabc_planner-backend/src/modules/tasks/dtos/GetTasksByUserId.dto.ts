import { IsUUID, IsNotEmpty } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { IGetTasksByUserId } from './interfaces/IGetTasksByUserId';

export class GetTasksByUserIdDTO implements IGetTasksByUserId {
  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  id: string;
}
