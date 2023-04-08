import { Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import * as path from 'path';

import * as fs from 'fs';
import { MailVerifyProfile } from 'src/models/mail-verify-profile.model';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';

@Injectable()
export class MailService {
  templateFolderPath = join(__dirname, 'templates');

  async sendMailtoValidateUser(verifyProfileModel: MailVerifyProfile) {
    const templatePath = './src/mail/templates/verify-user-email/body.hbs';
    const subject = fs.readFileSync(
      './src/mail/templates/verify-user-email/header.txt',
      { encoding: 'utf8' },
    );
    const templateContent = fs.readFileSync(templatePath, { encoding: 'utf8' });

    const url = 'localehost:3000/auth/verify/' + verifyProfileModel.token;

    const sendSmtpEmail = {
      sender: {
        email: process.env.MAIL_USER,
      },
      subject: subject,
      to: [
        {
          email: `${verifyProfileModel.email}`,
        },
      ],
      htmlContent: templateContent,
      params: {
        url: url,
      },
      headers: {
        'X-Mailin-custom':
          'custom_header_1:custom_value_1|custom_header_2:custom_value_2',
      },
    };

    try {
      await this.sendEmail(sendSmtpEmail);
    } catch (error) {
      console.log(error);
    }
    return true;
  }

  /**
   * Send Mail message which contains broadcast link
   * @param sendSmtpEmail
   */
  async sendEmail(sendSmtpEmail: any) {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;

    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.SEND_IN_BLUE_API_KEY;

    const partnerKey = defaultClient.authentications['partner-key'];
    partnerKey.apiKey = process.env.SEND_IN_BLUE_API_KEY;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function () {
        Logger.log('Send mail successfully.');
      },
      function (error) {
        Logger.error(error);
      },
    );
  }
}
