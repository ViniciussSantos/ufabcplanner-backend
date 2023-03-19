import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { IAuthenticateUser } from './interfaces/IAuthenticateUser';

export class AuthenticateUserDTO implements IAuthenticateUser {
  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsString({ message: messages.IsString })
  @IsEmail({}, { message: messages.IsEmail })
  email: string;

  @IsNotEmpty({ message: messages.isNotEmpty })
  @IsString({ message: messages.IsString })
  password: string;
}
