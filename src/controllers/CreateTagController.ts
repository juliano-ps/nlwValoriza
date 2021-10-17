import { Request, Response } from "express";
import { CreateTagService } from "../services/CreateTagService";
import { HttpStatus } from "../HttpStatus";

class CreateTagsController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const createTagService = new CreateTagService();

    const tag = await createTagService.execute(name);

    response.status(HttpStatus.CREATED).json(tag);
  }
}

export { CreateTagsController };