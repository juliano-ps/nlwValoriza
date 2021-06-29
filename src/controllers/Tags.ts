import { Request, Response } from "express";
import { CreateTagService } from "../services/CreateTagService";

class Tags {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const createTagService = new CreateTagService();

    const tag = await createTagService.execute(name);

    response.status(201).json(tag);
  }
}

export { Tags };