import { AppError } from './AppError';
import { HttpStatus } from './HttpStatus';

export class InternalServerError extends AppError {
  constructor(public error: any) {
    super('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR, 'InternalServerError');
  }
}
