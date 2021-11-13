import { expect } from "chai";
import { agent } from "supertest";
import app from "../../server";
import { IRegisterRequestBody } from "../../utility/interfaces";

describe("Auth register controller when POST on /api/v1/auth/register.", () => {
  describe("Request body validations.", () => {
    it("Should return errors if required body property not send.", async () => {
      const res = await agent(app)
        .post("/api/v1/auth/register")
        .send({
          firstName: null,
          lastName: null,
          email: "",
          password: "",
        } as IRegisterRequestBody);

      expect(res.statusCode).to.be.equal(422);
      expect(res.body).has.property("error");
    });

    it("Should return errors if user already exist.", async () => {
      const res = await agent(app)
        .post("/api/v1/auth/register")
        .send({
          email: "tuhinsaud@gmail.com",
          password: "1234567",
        } as IRegisterRequestBody);

      expect(res.statusCode).to.be.equal(422);
      expect(res.body).has.property("message", "User already exist.");
    });
  });
});
