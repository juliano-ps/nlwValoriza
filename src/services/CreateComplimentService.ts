import { getCustomRepository } from "typeorm";
import { NotFoundError } from "../errors/NotFoundError";
import { UnprocessableEntityError } from "../errors/UnprocessableEntityError";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
  tagId: string;
  userSender: string;
  userReceiver: string;
  message: string;
}

class CreateComplimentService {
  async execute({ tagId, userSender, userReceiver, message }: IComplimentRequest) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
    const usersRepositories = getCustomRepository(UsersRepositories);

    if(userReceiver === userSender) {
      throw new UnprocessableEntityError("User cannot send a compliment to itself");
    }

    const usersReceiverExists = await usersRepositories.findOne(userReceiver);

    if(!usersReceiverExists) {
      throw new NotFoundError("User Receiver does not exist");
    }

    const compliment = complimentsRepositories.create({ tagId, userSender, userReceiver, message });

    await complimentsRepositories.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };