import { NextFunction, Request, Response } from "express";
import logger from "../logger";
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
          const error = new HttpError("User already exist.", code);
          return next(error);
        }
      } else {
        if (!currentUser) {
          const error = new HttpError("User not exist.", code);
          return next(error);
        }
        // @ts-ignore
        req.user = currentUser;
      }
      return next();
    } catch (error) {
      logger.error(error);
      return next(new HttpError("Something went wrong.", 500));
    }
  };
};
