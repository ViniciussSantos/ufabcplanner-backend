import { IsUUID, IsNotEmpty } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { IGetExamsByUserId } from './interfaces/IGetExamsByUserId';

export class GetExamsByUserIdDTO implements IGetExamsByUserId {
  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  id: string;
}
