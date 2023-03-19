import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { ICreateUser } from './interfaces/ICreateUser';

export class CreateUserDTO implements ICreateUser {
  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsString({ message: messages.IsString })
  name: string;

  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsEmail({}, { message: messages.IsEmail })
  @IsString({ message: messages.IsString })
  email: string;

  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsString({ message: messages.IsString })
  password: string;
}
