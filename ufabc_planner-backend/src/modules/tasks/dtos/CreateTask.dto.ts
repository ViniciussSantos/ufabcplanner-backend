import { IsUUID, IsNotEmpty, IsString, IsDateString, IsOptional } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { ICreateTask } from './interfaces/ICreateTask';

export class CreateTaskDTO implements ICreateTask {
  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  subjectId: string;

  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  userId: string;

  @IsString({ message: messages.IsString })
  @IsNotEmpty({ message: messages.isNotEmpty })
  title: string;

  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsDateString({ message: messages.IsDateString })
  dueDate: string;

  @IsOptional()
  @IsString({ message: messages.IsString })
  description?: string;
}
