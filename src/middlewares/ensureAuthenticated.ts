import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { HttpStatus } from "../HttpStatus";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if(!authToken) {
    return response.status(HttpStatus.UNAUTHORIZED).end();
  }

  const [, token] = authToken.split(" ");

  try {
   const { sub } = verify(token, process.env.SECRET_KEY) as IPayload;

   request.userId = sub;

   return next();

  }catch (error) {
    console.error("error", error);
    return response.status(HttpStatus.UNAUTHORIZED).end();
  }
}