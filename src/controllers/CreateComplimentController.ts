import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";
import { HttpStatus } from "../HttpStatus";

class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { tagId, userReceiver, message } = request.body;

    const { userId } = request

    const createComplimentService = new CreateComplimentService();

   const compliment = await createComplimentService.execute({ tagId, userSender: userId, userReceiver, message });

    response.status(HttpStatus.CREATED).json(compliment);
  }
}

export { CreateComplimentController };