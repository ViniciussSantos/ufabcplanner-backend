import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { IUpdateSubject } from './interfaces/IUpdateSubject';

export class UpdateSubjectDTO implements IUpdateSubject {
  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  id: string;

  @IsString({ message: messages.IsString })
  @IsNotEmpty({ message: messages.isNotEmpty })
  name: string;

  @IsOptional()
  @IsString({ message: messages.IsString })
  description?: string;
}
