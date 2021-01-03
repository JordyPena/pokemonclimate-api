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
};

module.exports = AccountsService;
