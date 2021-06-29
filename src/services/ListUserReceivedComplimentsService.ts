import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";


class ListUserReceivedComplimentsService {
  async execute(userId) {
    const complimentsRepository = getCustomRepository(ComplimentsRepositories);

    const compliments = await complimentsRepository.find(
      {
        where: { userReceiver: userId}, 
        relations: ["userSender", "userReceiver", "tag"]
      });

    return compliments;
  }
}

export { ListUserReceivedComplimentsService }