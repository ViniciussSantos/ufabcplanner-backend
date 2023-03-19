import { AppError } from './AppError';
import { HttpStatus } from './HttpStatus';

export class ObjectNotFoundError extends AppError {
  constructor(message: string, id: string) {
    super(`${message} com id ${id} não existe`, HttpStatus.NOT_FOUND, 'ObjectNotFoundError');
  }
}
