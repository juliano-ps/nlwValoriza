import { HttpStatus } from "../HttpStatus";
import { BaseError } from "./BaseError";

class UnprocessableEntityError extends BaseError {
  constructor(problem: string) {
    super(problem, HttpStatus.UNPROCESSABLE_ENTITY, true, 'Unprocessable Entity');
  }
}

export { UnprocessableEntityError };