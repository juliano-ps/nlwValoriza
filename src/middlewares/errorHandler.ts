import {Request, Response, NextFunction } from "express";
import { BaseError } from "../errors/BaseError";
import { HttpStatus } from "../HttpStatus";

export function errorHandler(error: BaseError, request: Request, response: Response, next: NextFunction) {
  response.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).json(error.body);
}