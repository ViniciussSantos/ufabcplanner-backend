import { validate } from 'class-validator';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ClassValidationError } from './ClassValidationError';

export async function transformAndValidate<T extends Record<string, any>>(Dto: ClassConstructor<T>, obj: any) {
  const instance = plainToInstance(Dto, obj);
  const errors = await validate(instance, { whitelist: true, validationError: { target: false, value: false } });

  if (errors.length) {
    throw new ClassValidationError(errors);
  }

  return instance;
}
