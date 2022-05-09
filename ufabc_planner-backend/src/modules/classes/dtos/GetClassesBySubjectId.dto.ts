import { IsUUID, IsNotEmpty } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { IGetClassesBySubjectId } from './interfaces/IGetClassesBySubjectId';

export class GetClassesBySubjectIdDTO implements IGetClassesBySubjectId {
  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  id: string;
}
