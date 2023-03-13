const request = require("supertest");

let server;

describe("/api/someValue", () => {
  // eslint-disable-next-line node/global-require
  beforeEach(() => (server = require("../../app")));

  afterEach(() => server.close());

  describe("GET /", () => {
    it("should return an empty array for now", async () => {
      const res = await request(server).get("/api/users");

      expect(res.status).toBe(200);
    });
  });
});
