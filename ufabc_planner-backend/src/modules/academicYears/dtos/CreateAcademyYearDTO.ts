import { IsDateString, IsNotEmpty, IsNumberString, IsUUID } from 'class-validator';
import { messages } from 'utils/errors/messages';
import { ICreateAcademyYear } from './interfaces/ICreateAcademyYear';

export class CreateAcademyYearDTO implements ICreateAcademyYear {
  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  id: string;

  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsNumberString({ message: messages.IsNumberString })
  year: string;

  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsDateString({ message: messages.IsDateString })
  startDate: string;

  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsDateString({ message: messages.IsDateString })
  endDate: string;
}
