import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnprocessableEntityError } from "../errors/UnprocessableEntityError";
import { isBefore } from "date-fns";
import { hash } from "bcryptjs";

interface IResetPasswordRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  async execute({ token, password }: IResetPasswordRequest) {
    if(!password) {
      throw new BadRequestError("Invalid Password!");
    }

    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({ recoverPasswordToken: token });

    if(!user) {
      throw new NotFoundError("Invalid Token!");
    }

    if(isBefore(user.recoverPasswordTokenExpiresDate, new Date)) {
      throw new UnprocessableEntityError("Token expired!");
    }

    const hashedPassword = await hash(password, 10);
    
    user.password = hashedPassword;
    user.recoverPasswordToken = null;

    await usersRepositories.save(user);
  }
}

export { ResetPasswordService };