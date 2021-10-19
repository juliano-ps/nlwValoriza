import { HttpStatus } from "../HttpStatus";
import { BaseError } from "./BaseError";

class NotFoundError extends BaseError {
  constructor(problem: string) {
    super(problem, HttpStatus.NOT_FOUND, true, 'Not Found');
  }
}

export { NotFoundError };