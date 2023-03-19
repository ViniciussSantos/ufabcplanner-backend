import { IsUUID, IsNotEmpty, IsDateString, IsMilitaryTime, IsOptional, IsString } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { ICreateExam } from './interfaces/ICreateExam';

export class CreateExamDTO implements ICreateExam {
  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  subjectId: string;

  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  userId: string;

  @IsString({ message: messages.IsString })
  @IsNotEmpty({ message: messages.isNotEmpty })
  name: string;

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
