import { AppError } from './AppError';

export class BusinessLogicError extends AppError {
  constructor(message: string) {
    super(message, 400, 'BusinessLogicError');
  }
}
