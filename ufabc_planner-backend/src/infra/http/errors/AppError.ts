export class AppError {
  public readonly name: string;
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400, name = 'AppError') {
    this.name = name;
    this.message = message;
    this.statusCode = statusCode;
  }
}
