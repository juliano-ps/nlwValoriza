import { Request, Response } from "express";
import { HttpStatus } from "../HttpStatus";
import { ListUsersService } from "../services/ListUsersService";

class ListUsersController {
  async handle(request: Request, response: Response) {
    const listUsersService = new ListUsersService();

    const users = listUsersService.execute();

    return response.status(HttpStatus.OK).json(users);
  }
}

export { ListUsersController };