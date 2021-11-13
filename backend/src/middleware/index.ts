import { NextFunction, Request, Response } from "express";
import User from "../model/user.model";
import { HttpError } from "../model/utility.model";

export const userExistenceValidate = (
  errorWhen: "exist" | "not-exist",
  code: number = 500
) => {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      const email = req.body.email;
      const currentUser = await User.findOne({
        email: email,
      }).exec();

      if (errorWhen === "exist") {
        if (currentUser) {
          return next(new HttpError("User already exist.", code));
        }
      } else {
        if (!currentUser) {
          return next(new HttpError("User not exist.", code));
        }
        // @ts-ignore
        req.user = currentUser;
      }
      return next();
    } catch (error) {
      return next(new HttpError("Something went wrong.", 500));
    }
  };
};
