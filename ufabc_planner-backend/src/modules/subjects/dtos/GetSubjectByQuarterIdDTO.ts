import { IsUUID, IsNotEmpty } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { IGetSubjectByQuarterId } from './interfaces/IGetSubjectByQuarterId';

export class GetSubjectByQuarterIdDTO implements IGetSubjectByQuarterId {
  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  quarterId: string;
}
