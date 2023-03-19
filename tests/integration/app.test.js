const config = require("config");
const request = require("supertest");
const createApp = require("../../app");
const MongoService = require("../../db");
const { MongooseUserRepo } = require("../../UserRepo");

const server = createApp();
const mongoService = new MongoService(config.get("db"));
const userRepo = new MongooseUserRepo();

describe("/api/users", () => {
  beforeAll(async () => {
    try {
      await mongoService.connect();
    } catch (e) {
      console.error("Cannot connect to DB");
      process.exit(1);
    }
  });

  beforeEach(() => {
    return mongoService.dropDb();
  });

  afterAll(() => {
    return mongoService.disconnect();
  });

  describe("GET /", () => {
    it("should return 400 when name query does not exists", async () => {
      const res = await request(server).get("/api/users?other=1000");

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Name required");
    });

    it("should return 400 when name query is less than 5 characters", async () => {
      const res = await request(server).get("/api/users?name=1234");

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Too short");
    });

    it("should return 400 when name not unique", async () => {
      await userRepo.create("Alireza");
      const res = await request(server).get("/api/users?name=Alireza");

      expect(res.status).toBe(400);
    });

    it("should return list of users when the name is unique", async () => {
      const res = await request(server).get("/api/users?name=newAlireza22");

      expect(res.status).toBe(200);
    });
  });
});
