import { IsUUID, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { ICreateSubject } from './interfaces/ICreateSubject';

export class CreateSubjectDTO implements ICreateSubject {
  @IsString({ message: messages.IsString })
  @IsNotEmpty({ message: messages.isNotEmpty })
  name: string;

  @IsOptional()
  @IsString({ message: messages.IsString })
  description?: string;

  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  quarterId: string;
}
