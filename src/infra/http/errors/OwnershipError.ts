import { AppError } from './AppError';
import { HttpStatus } from './HttpStatus';

export class OwnershipError extends AppError {
  constructor(owner: string, resource: string) {
    super(`o ${owner} não é dono do ${resource}`, HttpStatus.FORBIDDEN, 'OwnershipError');
  }
}
