import { getCustomRepository } from "typeorm";
import { NotFoundError } from "../errors/NotFoundError";
import { UnprocessableEntityError } from "../errors/UnprocessableEntityError";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { Mailer } from "../modules/Mailer";
import { resolve } from "path";

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
      throw new UnprocessableEntityError("User cannot send a compliment to yourself");
    }

    const receiver = await usersRepositories.findOne(userReceiver);

    if(!receiver) {
      throw new NotFoundError("User Receiver does not exist");
    }

    const compliment = complimentsRepositories.create({ tagId, userSender, userReceiver, message });

    await complimentsRepositories.save(compliment);

    const templatePath = resolve(__dirname, "..", "resources", "mails", "compliment_received.hbs");

    const mailer = new Mailer();

    await mailer.sendEmail(receiver.email, "Elogio recebido", templatePath);

    return compliment;
  }
}

export { CreateComplimentService };