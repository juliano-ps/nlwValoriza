import { getCustomRepository } from "typeorm";
import { BadRequestError } from "../errors/BadRequestError";
import { UnprocessableEntityError } from "../errors/UnprocessableEntityError";
import { TagsRepositories } from "../repositories/TagsRepositories";

class CreateTagService {
  async execute(name: string) {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    if(!name) {
      throw new BadRequestError("Incorrect tag name");
    }

    const tagAlreadyExists = await tagsRepositories.findOne({name});

    if(tagAlreadyExists) {
      throw new UnprocessableEntityError("Tag already exists");
    }

    const tag = tagsRepositories.create({name});

    await tagsRepositories.save(tag);

    return tag;
  }
}

export { CreateTagService }