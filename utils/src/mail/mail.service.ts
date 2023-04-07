import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import { MailVerifyProfile } from 'src/models/mail-verify-profile.model';

@Injectable()
export class MailService {
  templateFolderPath = join(__dirname, 'templates');
  constructor(private mailerService: MailerService) {}

  async sendMailtoValidateUser(verifyProfileModel: MailVerifyProfile) {
    const templateFolderName = 'verify-user-email';
    // const templatePath = join(
    //   this.templateFolderPath,
    //   templateFolderName,
    //   `body.hbs`,
    // );
    // const subject = this.getEmailSubject(
    //   templateFolderName,
    //   verifyProfileModel.token,
    // );

    const url = 'localehost:3000/auth/verify/' + verifyProfileModel.token;

    await this.mailerService.sendMail({
      to: verifyProfileModel.email,
      subject: 'zakaria',
      template: './src/mail/templates/verify-user-email/body.hbs',
      context: {
        url: url,
      },
    });
  }

  /**
   * Edit header of the e-mail
   *
   * @param templateFolderName
   * @param token
   * @private
   */
  private getEmailSubject(templateFolderName: string, token: string): string {
    const subjectPath = join(
      this.templateFolderPath,
      templateFolderName,
      `header.txt`,
    );
    const subjectTemplate = fs.readFileSync(subjectPath, { encoding: 'utf8' });
    const subject = subjectTemplate.replace('{{organization}}', token);

    return subject;
  }
}
