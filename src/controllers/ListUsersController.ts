import { Request, Response } from "express";
import { ListUsersService } from "../services/ListUsersService";

class ListUsersController {
  async handle(request: Request, response: Response) {
    const listUsersService = new ListUsersService();

    const users = listUsersService.execute();

    return response.status(200).json(users);
  }
}

export { ListUsersController };