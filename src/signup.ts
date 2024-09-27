import AccountDAO from "./AccountRepository";
import MailerGateway from "./MailerGateway";
import Account from "./Account";

export default class Signup {
  constructor(
    readonly accountDAO: AccountDAO,
    readonly mailerGateway: MailerGateway
  ) {}

  async execute(input: any) {
    const account = Account.create(
      input.name,
      input.email,
      input.cpf,
      input.carPlate,
      input.password,
      input.isPassenger,
      input.isDriver
    );
    const accountData = await this.accountDAO.getAccountByEmail(input.email);
    if (accountData) throw new Error("Duplicated account");
    await this.accountDAO.saveAccount(account);
    await this.mailerGateway.send(account.getEmail(), "Welcome!", "...");
    return {
      accountId: account.getAccountId(),
    };
  }
}
