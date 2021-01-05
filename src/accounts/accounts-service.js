const jwt = require("jsonwebtoken");
const config = require("../config");
const bcrypt = require("bcryptjs");
const xss = require("xss");
const AccountsService = {
  addAccount(db, newAccount) {
    //function that will create a new user
    const createUser = () =>
      db
        .insert(newAccount)
        .into("accounts")
        .returning(["id", "username"])
        .then((rows) => {
          return rows[0];
        });
    //check to see if user exists
    return db
      .select("*")
      .from("accounts")
      .where({ username: newAccount.username })
      .first()
      .then((user) => {
        //if user does exist return nothing
        if (user) return Promise.resolve();
        //if not return the result of createUser()
        return createUser();
      });
  },

  getAllAccounts(db) {
    return db.select("*").from("accounts");
  },

  getAccount(db, username, password) {
    return db
      .select(["id", "username"])
      .from("accounts")
      .where({ username: username, password: password })
      .first();
  },

  deleteAccount(db, id) {
    return db("accounts")
      .where({
        id: id,
      })
      .delete();
  },
  createJwt(subject, payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      subject,
      algorithm: "HS256",
    });
  },
  verifyJwt(token) {
    return jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  hasAccountWithUsername(db, username) {
    return db("accounts")
      .where({ username })
      .first()
      .then((user) => !!user);
  },
  createAccount(db, newAccount) {
    return db
      .insert(newAccount)
      .into("accounts")
      .returning("*")
      .then((rows) => rows[0]);
  },
  serializeUser(user) {
    return {
      id: user.id,
      username: xss(user.username),
    };
  },
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  },
  getUserWithUserName(db, username) {
    return db.where({ username }).first();
  },
};

module.exports = AccountsService;
