import { Request, Response } from "express";
import { ResetPasswordService } from "../services/ResetPasswordService"
import { HttpStatus } from "../HttpStatus";

class ResetPasswordController {
  async handle(request: Request, response: Response) {
    const { token } = request.query;
    const { password } = request.body;

    const resetPasswordService = new ResetPasswordService();

    await resetPasswordService.execute({ token: String(token), password });

    response.status(HttpStatus.OK).end();
  }
}

export { ResetPasswordController };