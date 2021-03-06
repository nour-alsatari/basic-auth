const server = require("../src/server");
const supertest = require("supertest");
const request = supertest(server.app);

const {db} = require("../src/models/index");

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe("unit testing", () => {
  it("POST to /signup to create a new user", async () => {
    let user = {
      username: "test",
      password: "1234",
    };
    const response = await request.post("/signup").send(user);
    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual("test");
  });

  it("POST to /signin to login as a user (use basic auth)", async () => {
    let user = {
      username: "test",
      password: "1234",
    };
    const response = await request.post('/signin').auth(user.username, user.password);
    expect(response.status).toBe(200);
  });
});
