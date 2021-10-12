import { getCustomRepository } from "typeorm"; 
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";
import { BadRequestError } from "../errors/BadRequestError";
import { UnprocessableEntityError } from "../errors/UnprocessableEntityError";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUserService {
  
  async execute({ name, email, admin = false, password} : IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    if(!email) {
      throw new BadRequestError("Email incorrect");
    }

    const userAlreadyExists = await usersRepository.findOne({ email });

    if(userAlreadyExists) {
      throw new UnprocessableEntityError("User already exists");
    }

    const hashedPassword = await hash(password, 10);

    const user = usersRepository.create({ name, email, admin, password: hashedPassword });

    await usersRepository.save(user);

    return user;
  } 
}

export { CreateUserService }