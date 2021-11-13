import { expect } from "chai";
import { agent } from "supertest";
import User from "../../model/user.model";
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
          email: "tuhin@gmail.com",
          password: "1234567",
        } as IRegisterRequestBody);

      expect(res.statusCode).to.be.equal(422);
      expect(res.body).has.property("message", "User already exist.");
    });

    it("Should return status code 201 if user already successfully.", async () => {
      const res = await agent(app)
        .post("/api/v1/auth/register")
        .send({
          email: "ppp@gmail.com",
          password: "1234567",
        } as IRegisterRequestBody);

      expect(res.statusCode).to.be.equal(201);
      expect(res.body.data).has.property("email", "ppp@gmail.com");
    });
    after(async () => {
      await User.deleteOne({ email: "ppp@gmail.com" }).exec();
    });
  });
});
