import { BiweeklyType, Weekdays } from '@prisma/client';
import { IsEnum, IsMilitaryTime, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { messages } from 'infra/http/errors/messages';
import { IUpdateClass } from './interfaces/IUpdateClass';

export class UpdateClassDTO implements IUpdateClass {
  @IsUUID('all', { message: messages.IsUUID })
  @IsNotEmpty({ message: messages.isNotEmpty })
  id: string;

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

  @IsMilitaryTime()
  @IsNotEmpty({ message: messages.isNotEmpty })
  startTime: string;

  @IsMilitaryTime()
  @IsNotEmpty({ message: messages.isNotEmpty })
  endTime: string;

  @IsEnum(Weekdays)
  @IsNotEmpty({ message: messages.isNotEmpty })
  weekday?: Weekdays;

  @IsOptional()
  @IsEnum(BiweeklyType)
  biweeklyType?: BiweeklyType;
}
