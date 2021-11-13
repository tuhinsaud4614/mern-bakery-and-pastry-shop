import { expect } from "chai";
import { agent } from "supertest";
import app from "../../server";
import { IRegisterRequestBody } from "../../utility/interfaces";

describe("Auth validations middleware", () => {
  describe("Auth Request body validations", () => {
    it("Should return errors if required body property not send when POST on /api/v1/auth/register", async () => {
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
  });
});
