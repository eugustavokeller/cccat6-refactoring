export default interface MailerGateway {
  send(recipient: string, subject: string, message: string): Promise<void>;
}

export class MailerGatewayMemory implements MailerGateway {
  async send(recipient: string, subject: string, message: string) {
    console.log(
      `Sending email to ${recipient} with subject ${subject} and message ${message}`
    );
  }
}
