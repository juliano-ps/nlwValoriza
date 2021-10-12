import { Request, Response } from "express";
import { ListTagsService } from "../services/ListTagsService";
import { HttpStatus } from "../HttpStatus";

class ListTagsController {
  async handle(request: Request, response: Response) {
    const listTagsService = new ListTagsService();

    const tags = await listTagsService.execute();

    return response.status(HttpStatus.OK).json(tags);
  }
}

export { ListTagsController };