import express from "express";
import cors from "cors";
import { AccountRepositoryDatabase } from "./AccountRepository";
import { MailerGatewayMemory } from "./MailerGateway";
import Signup from "./Signup";
import GetAccount from "./GetAccount";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  const input = req.body;
  try {
    const accountDAO = new AccountRepositoryDatabase();
    const mailerGateway = new MailerGatewayMemory();
    const signup = new Signup(accountDAO, mailerGateway);
    const output = await signup.execute(input);
    res.json(output);
  } catch (err: any) {
    res.status(422).json({ message: err.message });
  }
});

app.get("/accounts/:accountId", async (req, res) => {
  const accountDAO = new AccountRepositoryDatabase();
  const getAccount = new GetAccount(accountDAO);
  const output = await getAccount.execute(req.params.accountId);
  console.log("output: ", output);
  res.json(output);
});

app.listen(3000);
