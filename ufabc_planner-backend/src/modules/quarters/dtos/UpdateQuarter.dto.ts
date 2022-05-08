import { IsUUID, IsNotEmpty, IsDateString } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { IUpdateQuarter } from './interfaces/IUpdateQuarter';

export class UpdateQuarterDTO implements IUpdateQuarter {
  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  id: string;

  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsDateString({ message: messages.IsDateString })
  startDate: string;

  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsDateString({ message: messages.IsDateString })
  endDate: string;
}
