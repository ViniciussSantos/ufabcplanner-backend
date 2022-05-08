import { IsUUID, IsNotEmpty } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { IDeleteSubject } from './interfaces/IDeleteSubject';

export class DeleteSubjectDTO implements IDeleteSubject {
  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  id: string;
}
