import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const tokenWithBearer = request.headers.authorization;

  if(!tokenWithBearer) {
    return response.status(401).end();
  }

  const [, token] = tokenWithBearer.split(" ");

  try {
   const { sub } = verify(token, "62252911ea3f7eb5f2ea3d0947728210") as IPayload;

   request.userId = sub;

   return next();

  }catch (error) {
    return response.status(401).end();
  }
  

  return next();
}