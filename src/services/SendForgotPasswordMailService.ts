import { getCustomRepository } from "typeorm"; 
import { UsersRepositories } from "../repositories/UsersRepositories";
import { v4 as uuid } from "uuid";
import { Mailer } from "../modules/Mailer";
import { resolve } from "path";
import { format, addHours } from "date-fns";

class SendForgotPasswordMailService {
  async execute(email: string) {
    const usersRepository = getCustomRepository(UsersRepositories);

    const user = await  usersRepository.findOne({ email: email });

    if(!user) {
      return 
    }

    const templatePath = resolve(__dirname, "..", "resources", "mails", "forgot_password.hbs");

    const mailer = new Mailer();

    const token = uuid();

    const variables = {
      url: `${process.env.FORGOT_MAIL_URL}${token}`
    };

    await mailer.sendEmail(email, "Recuperação de Senha", templatePath, variables);

    const tokenExpiresDate = addHours(new Date, 1);

    const formattedDate = format(tokenExpiresDate, "yyyy-MM-dd HH:mm:ss");

    user.recoverPasswordToken = token;
    user.recoverPasswordTokenExpiresDate = new Date(formattedDate)

    await usersRepository.save(user);
  }
}

export { SendForgotPasswordMailService };