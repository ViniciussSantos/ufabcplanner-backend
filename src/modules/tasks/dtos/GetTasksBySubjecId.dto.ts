import { IsUUID, IsNotEmpty } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { IGetTasksBySubjectId } from './interfaces/IGetTasksBySubjectId';

export class GetTasksBySubjectIdDTO implements IGetTasksBySubjectId {
  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  id: string;
}
