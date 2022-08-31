import { IsUUID, IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { IUpdateTask } from './interfaces/IUpdateTask';

export class UpdateTaskDTO implements IUpdateTask {
  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  id: string;

  @IsOptional()
  @IsString({ message: messages.IsString })
  title?: string;

  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsDateString({ message: messages.IsDateString })
  dueDate: string;

  @IsOptional()
  @IsString({ message: messages.IsString })
  description?: string;
}
