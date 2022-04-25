import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { ICreateQuarter } from './interfaces/ICreateQuarter';

export class createQuarterDTO implements ICreateQuarter {
  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  academicYearId: string;

  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsDateString({ message: messages.IsDateString })
  startDate: string;

  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsDateString({ message: messages.IsDateString })
  endDate: string;
}
