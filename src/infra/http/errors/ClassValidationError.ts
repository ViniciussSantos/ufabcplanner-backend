import { ValidationError } from 'class-validator';
import { AppError } from './AppError';
import { HttpStatus } from './HttpStatus';

export class ClassValidationError extends AppError {
  constructor(public errors: ValidationError[]) {
    super('Erros de validação foram encontrados', HttpStatus.BAD_REQUEST, 'ValidationError');
  }
}
