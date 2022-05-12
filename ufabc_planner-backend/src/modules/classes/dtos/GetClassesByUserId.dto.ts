import { IsUUID, IsNotEmpty } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { IGetClassesByUserId } from './interfaces/IGetClassesByUserId';

export class GetClassesByUserIdDTO implements IGetClassesByUserId {
  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  id: string;
}
