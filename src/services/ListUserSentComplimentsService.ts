import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";


class ListUserSentComplimentsService {
  async execute(userId) {
    const complimentsRepository = getCustomRepository(ComplimentsRepositories);

    const compliments = await complimentsRepository.find(
      {
        where: { userSender: userId},
        relations: ["userSender", "userReceiver", "tag"]
      });

    return compliments;
  }
}

export { ListUserSentComplimentsService }