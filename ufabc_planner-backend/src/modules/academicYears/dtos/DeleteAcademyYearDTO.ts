import { IsUUID, IsNotEmpty } from 'class-validator';
import { messages } from 'utils/errors/messages';
import { IDeleteAcademyYear } from './interfaces/IDeleteAcademyYear';

export class DeleteAcademyYearDTO implements IDeleteAcademyYear {
  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  academicYearId: string;
}
