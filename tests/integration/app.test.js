const request = require("supertest");
const createApp = require("../../app");

let server;

describe("/api/users", () => {
  beforeAll(async () => {
    const { listen } = createApp(3001);
    const app = await listen();
    server = app;
  });

  afterAll(() => {
    console.log(server);
    server.close();
  });

  describe("GET /", () => {
    it("should return an empty array for now", async () => {
      const res = await request(server).get("/api/users");

      expect(res.status).toBe(200);
    });
  });
});
