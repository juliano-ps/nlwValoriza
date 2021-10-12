
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticationRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticationRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    
    const user = await usersRepositories.findOne({ email });

    if(!user) {
      throw new UnauthorizedError("Incorrect Email or Password");
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new UnauthorizedError("Incorrect Email or Password");
    }

    //colocar segundo parametro num .env
    const token = sign({ email: user.email}, "62252911ea3f7eb5f2ea3d0947728210", {
     subject: user.id,
     expiresIn: "1d"
    });

    return token;
  }
}

export { AuthenticateUserService };