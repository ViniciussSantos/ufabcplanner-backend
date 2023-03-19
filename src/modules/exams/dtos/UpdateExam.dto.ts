import { IsUUID, IsNotEmpty, IsOptional, IsString, IsDateString, IsMilitaryTime } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { IUpdateExam } from './interfaces/IUpdateExam';

export class UpdateExamDTO implements IUpdateExam {
  @IsOptional()
  @IsUUID('all', { message: messages.IsUUID })
  subjectId?: string;

  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  id: string;

  @IsOptional()
  @IsString({ message: messages.IsString })
  name?: string;

  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsDateString({ message: messages.IsDateString })
  dueDate: string;

  @IsMilitaryTime({ message: messages.IsMilitaryTime })
  @IsNotEmpty({ message: messages.isNotEmpty })
  time: string;

  @IsOptional()
  @IsString({ message: messages.IsString })
  description?: string;
}
