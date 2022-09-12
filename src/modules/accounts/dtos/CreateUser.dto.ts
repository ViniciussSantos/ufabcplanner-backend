import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { ICreateUser } from './interfaces/ICreateUser';

export class CreateUserDTO implements ICreateUser {
  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsString()
  name: string;

  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsString()
  password: string;
}
