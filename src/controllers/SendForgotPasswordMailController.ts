import { Request, Response } from "express";
import { SendForgotPasswordMailService } from "../services/SendForgotPasswordMailService";
import { HttpStatus } from "../HttpStatus";

class SendForgotPasswordMailController {
  async handle(request: Request, response: Response) {
    const { email } = request.body;

    const sendForgotPasswordMailService = new SendForgotPasswordMailService();

    await sendForgotPasswordMailService.execute(email);

    response.status(HttpStatus.NO_CONTENT).end();
  }
}

export { SendForgotPasswordMailController };