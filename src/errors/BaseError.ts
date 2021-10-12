class BaseError extends Error {
  private _statusCode: number;
  private _isOperational: boolean;
  private _body;

  constructor(problem: string, statusCode: number, isOperational: boolean, description: string) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this._statusCode = statusCode;
    this._isOperational = isOperational;
    this._body = {
      description: description,
      problem: problem,
    }

    Error.captureStackTrace(this);
  }

  get statusCode(): number {
    return this._statusCode;
  }

  set statusCode(statusCode: number) {
    this._statusCode = statusCode;
  }

  get isOperational(): boolean {
    return this._isOperational;
  }

  set isOperational(isOperational: boolean) {
    this._isOperational = isOperational;
  }

  get body(): string {
    return this._body;
  }

  set body(body: string) {
    this._body = body;
  }
}

export { BaseError };