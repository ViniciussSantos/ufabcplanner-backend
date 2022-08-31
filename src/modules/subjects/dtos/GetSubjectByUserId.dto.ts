import { IsUUID, IsNotEmpty } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { IGetSubjectByUserId } from './interfaces/IGetSubjectByUserId';

export class GetSubjectByUserIdDTO implements IGetSubjectByUserId {
  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  id: string;
}
