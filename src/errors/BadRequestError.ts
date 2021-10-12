import { HttpStatus } from "../HttpStatus";
import { BaseError } from "./BaseError";

class BadRequestError extends BaseError {
  constructor(problem: string) {
    super(problem, HttpStatus.BAD_REQUEST, true, 'Bad Request');
  }
}

export { BadRequestError };