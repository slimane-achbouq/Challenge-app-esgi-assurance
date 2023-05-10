export class MailVerifyProfile {
  email: string;
  token: string;

  constructor({ email, token }: Partial<MailVerifyProfile> = {}) {
    this.email = email;
    this.token = token;
  }
}
