const AccountsService = require("./accounts-service");
const express = require("express");
const logger = require("../logger");
const accountsRouter = express.Router();

const jsonParser = express.json();
//get all accounts
accountsRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    AccountsService.getAllAccounts(knexInstance)
      .then((accounts) => {
        res.status(200).json(accounts);
      })
      .catch(next);
  })
  //create a new account
  .post(jsonParser, (req, res, next) => {
    const { username, password } = req.body;
    const newAccount = { username, password };

    const numberOfValues = Object.values(req.body).filter(Boolean).length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain both 'username' and 'password'`,
        },
      });

    AccountsService.addAccount(req.app.get("db"), newAccount)
      .then((account) => {
        if (!account) {
          return res.status(401).json({
            error: {
              message: `User already exists, try signing in`,
            },
          });
        }
        res.status(201).json(account);
      })
      .catch(next);
  });

//sign into account if exists
accountsRouter
  .route("/account")
  .post(jsonParser, (req, res, next) => {
    const { username, password } = req.body;

    AccountsService.getAccount(req.app.get("db"), username, password)
      .then((account) => {
        if (!account) {
          return res.status(401).json({
            error: { message: `Auth failed` },
          });
        }
        const subject = account.username;
        const payload = { user_id: account.id };
        res.send({
          authToken: AccountsService.createJwt(subject, payload),
        });
      })
      .catch(next);
  })
  .delete(jsonParser, (req, res, next) => {
    const { account_id } = req.body;

    AccountsService.deleteAccount(req.app.get("db"), account_id)
      .then((numberOfAffectedRows) => {
        logger.info(`Account with id ${account_id} deleted`);
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = accountsRouter;
