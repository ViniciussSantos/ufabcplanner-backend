import { IsDateString, IsNotEmpty, IsNumberString, IsUUID } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { IUpdateAcademyYear } from './interfaces/IUpdateAcademicYear';

export class UpdateAcademyYearDTO implements IUpdateAcademyYear {
  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  id: string;

  @IsNumberString({ message: messages.IsNumberString })
  year?: string;

  @IsDateString({ message: messages.IsDateString })
  startDate: string;

  @IsDateString({ message: messages.IsDateString })
  endDate: string;
}
