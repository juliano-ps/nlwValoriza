import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";

class Mailer {
  private client: Transporter;

  constructor() {
  this.client = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: parseInt(process.env.NODEMAILER_PORT),
      auth: { 
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, path: string, variables?: any) {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");
    
    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);  
  
    await this.client.sendMail({
      to,
      from: process.env.NODEMAILER_FROM,
      subject,
      html: templateHTML,
    });
  }
}

export { Mailer };