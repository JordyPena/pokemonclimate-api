require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const errorHandler = require("./error-handler")
const accountsRouter = require("./accounts/accounts-router")

const app = express();

const morganSetting = process.env.NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganSetting));
app.use(helmet());
app.use(cors());
app.use("/api/accounts", accountsRouter)
// app.get("/", (req, res) => {
//   res.send("Hello, world!");
// });

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (process.env.NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    response = { error };
  }
  res.status(500).json(response);
});

app.use(errorHandler);

module.exports = app;
