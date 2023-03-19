import { BiweeklyType, Weekdays } from '@prisma/client';
import { IsUUID, IsNotEmpty, IsOptional, IsString, IsMilitaryTime, IsEnum } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { ICreateClass } from './interfaces/ICreateClass';

export class CreateClassDTO implements ICreateClass {
  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  subjectId: string;

  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  userId: string;

  @IsOptional()
  @IsString({ message: messages.IsString })
  professor?: string;

  @IsOptional()
  @IsString({ message: messages.IsString })
  room?: string;

  @IsOptional()
  @IsString({ message: messages.IsString })
  campus?: string;

  @IsOptional()
  @IsString({ message: messages.IsString })
  building?: string;

  @IsMilitaryTime({ message: messages.IsMilitaryTime })
  @IsNotEmpty({ message: messages.isNotEmpty })
  startTime: string;

  @IsMilitaryTime({ message: messages.IsMilitaryTime })
  @IsNotEmpty({ message: messages.isNotEmpty })
  endTime: string;

  @IsEnum(Weekdays)
  @IsNotEmpty({ message: messages.isNotEmpty })
  weekday: Weekdays;

  @IsOptional()
  @IsEnum(BiweeklyType)
  biweeklyType?: BiweeklyType;
}
