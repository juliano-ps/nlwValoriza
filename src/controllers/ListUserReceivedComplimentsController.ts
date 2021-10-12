import { Request, Response } from "express";
import { HttpStatus } from "../HttpStatus";
import { ListUserReceivedComplimentsService } from "../services/ListUserReceivedComplimentsService";

class ListUserReceivedComplimentsController {
  async handle(request: Request, response: Response) {
    const listUserReceivedComplimentsService = new ListUserReceivedComplimentsService();

    const { userId } = request

    const compliments = await listUserReceivedComplimentsService.execute({ userId });

    return response.status(HttpStatus.OK).json(compliments);
  }
}

export { ListUserReceivedComplimentsController };