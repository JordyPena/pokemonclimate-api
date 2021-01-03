// const app = require('../src/app')
const supertest = require("supertest");
const request = supertest("http://localhost:7000");

describe("GET /api/accounts", () => {
  it("should GET all accounts", () => {
    request.get("/api/accounts").expect(200, (error) => {
      console.error(error);
    });
  });
});

describe("POST /api/accounts", () => {
  it("Creates a new account", (done) => {
    request
      .post("/api/accounts")
      .send({
        username: "test",
        password: 1234,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201, done());
  });
});

describe("POST /api/accounts/account", () => {
  it("Logs in to account", (done) => {
    request
      .post("/api/accounts/account")
      .send({
        username: "test",
        password: 1234,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201, done());
  });
});
