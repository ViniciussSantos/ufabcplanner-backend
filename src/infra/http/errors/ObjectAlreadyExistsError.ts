import { AppError } from './AppError';

export class ObjectAlreadyExistsError extends AppError {
  constructor(object: string) {
    super(object, 409, 'ObjectAlreadyExistsError');
  }
}
