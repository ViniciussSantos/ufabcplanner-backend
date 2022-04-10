import { IsDateString, IsNotEmpty, IsNumberString, IsOptional, IsUUID } from 'class-validator';
import { messages } from 'utils/errors/messages';
import { IUpdateAcademyYear } from './interfaces/IUpdateAcademicYear';

export class UpdateAcademyYearDTO implements IUpdateAcademyYear {
  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  id: string;

  @IsNumberString({ message: messages.IsNumberString })
  year: string;

  @IsOptional()
  @IsDateString({ message: messages.IsDateString })
  start_date?: string;

  @IsOptional()
  @IsDateString({ message: messages.IsDateString })
  end_date?: string;
}
