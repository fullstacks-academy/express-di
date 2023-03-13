const request = require("supertest");

let server;

describe("/api/someValue", () => {
    beforeEach(() => server = require("../../app.js"));
    afterEach(() => server.close());

    describe("GET /", () => {
        it("should return an empty array for now", async () => {
            const res = await request(server).get("/api/someValue");
            expect(res.status).toBe(200);
        });
    });
});