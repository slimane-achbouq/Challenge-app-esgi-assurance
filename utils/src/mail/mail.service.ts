import { Injectable } from '@nestjs/common';
import { join } from 'path';

import * as fs from 'fs';
import { MailVerifyProfile } from 'src/models/mail-verify-profile.model';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const SibApiV3Sdk = require('sib-api-v3-typescript');

@Injectable()
export class MailService {
  templateFolderPath = join(__dirname, 'templates');

  async sendMailtoValidateUser(verifyProfileModel: MailVerifyProfile) {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = process.env.SEND_IN_BLUE_API_KEY;

    const templatePath = './src/mail/templates/verify-user-email/body.hbs';
    const subject = fs.readFileSync(
      './src/mail/templates/verify-user-email/header.txt',
      { encoding: 'utf8' },
    );
    const templateContent = fs.readFileSync(templatePath, { encoding: 'utf8' });

    const url = 'http://127.0.0.1:5173/verify/' + verifyProfileModel.token;

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
      await apiInstance.sendTransacEmail(sendSmtpEmail);
    } catch (error) {
      console.log(error);
    }
  }
}
