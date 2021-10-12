import { HttpStatus } from "../HttpStatus";
import { BaseError } from "./BaseError";

class UnauthorizedError extends BaseError {
  constructor(problem: string) {
    super(problem, HttpStatus.UNAUTHORIZED, true, 'Unauthorized');
  }
}

export { UnauthorizedError };