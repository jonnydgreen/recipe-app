export interface ErrorOptions {
  message: string;
  statusCode?: number;
}

export class AppError extends Error {
  statusCode?: number;
  constructor(options: ErrorOptions) {
    super(options.message);
    this.statusCode = options.statusCode;
  }
}
