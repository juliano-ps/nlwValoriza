import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class Users {
  async handle(request: Request, response: Response) {
    const { name, email, admin, password } = request.body;

    const createUserService = new CreateUserService();
    
    const user = await createUserService.execute({ name, email, admin, password });

    return response.status(201).json(user);
  }
}

export { Users };