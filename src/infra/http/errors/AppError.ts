export class AppError extends Error {
  constructor(public message: string, public readonly code: number, public name: string) {
    super(message);

    Object.defineProperty(this, 'message', { enumerable: true });
    Error.captureStackTrace(this, this.constructor);
    Object.defineProperty(this, 'stack', { enumerable: true });
  }

  toJson(): any {
    return {
      ...AppError.format(this),
      stack: this.stack?.split('\n'),
    };
  }

  static format(value: any): any {
    if (typeof value === 'function' || typeof value === 'number') {
      return undefined;
    }

    if (typeof value !== 'object') {
      return value;
    }

    if (Array.isArray(value)) {
      return value.map(AppError.format);
    }

    if (value instanceof Error) {
      return Object.getOwnPropertyNames(value).reduce((obj, k) => {
        obj[k] = AppError.format((value as any)[k]);

        return obj;
      }, {} as any);
    }

    return Object.entries(value).reduce((obj, [k, v]) => {
      obj[k] = AppError.format(v);

      return obj;
    }, {} as any);
  }
}
