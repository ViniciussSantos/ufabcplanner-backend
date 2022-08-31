import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { ClassConstructor, plainToClass, plainToInstance } from 'class-transformer';
import { AppError } from './AppError';

export async function validateInput<T extends Object>(Dto: ClassConstructor<T>, obj: any) {
  const instance = plainToInstance(Dto, obj);
  const errors = await validate(instance, { whitelist: true });

  if (errors.length) {
    throw new AppError('Erros de validação foram encontrados', 400, 'ValidationError');
  }

  return instance;
}
