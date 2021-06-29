import { Request, Response } from "express";
import { ListUserSentComplimentsService } from "../services/ListUserSentComplimentsService";

class ListUserSentComplimentsController {
  async handle(request: Request, response: Response) {
    const listUserSentComplimentsService = new ListUserSentComplimentsService();

    const { userId } = request

    const compliments = await listUserSentComplimentsService.execute({ userId });

    return response.status(200).json(compliments);
  }
}

export { ListUserSentComplimentsController };