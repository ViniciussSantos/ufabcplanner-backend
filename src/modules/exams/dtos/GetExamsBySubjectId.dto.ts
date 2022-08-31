import { IsUUID, IsNotEmpty } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { IGetExamsBySubjectId } from './interfaces/IGetExamsBySubjectId';

export class GetExamsBySubjectIdDTO implements IGetExamsBySubjectId {
  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  id: string;
}
