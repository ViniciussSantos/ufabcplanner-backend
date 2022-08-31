import { IsUUID, IsNotEmpty } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { IGetQuarterByAcademicYearId } from './interfaces/IGetQuarterByAcademicYearId';

export class GetQuarterByAcademicYearIdDTO implements IGetQuarterByAcademicYearId {
  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  academicYearId: string;
}
