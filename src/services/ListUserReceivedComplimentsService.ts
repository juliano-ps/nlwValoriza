import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";


class ListUserReceivedComplimentsService {
  async execute(userId: String) {
    const complimentsRepository = getCustomRepository(ComplimentsRepositories);

    const compliments = await complimentsRepository.find({
        where: { userReceiver: userId}, 
      });

    return compliments;
  }
}

export { ListUserReceivedComplimentsService }