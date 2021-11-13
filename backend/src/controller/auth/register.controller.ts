import { hash } from "bcryptjs";
import { NextFunction, Request, RequestHandler, Response } from "express";
import logger from "../../logger";
import User from "../../model/user.model";
import { HttpError } from "../../model/utility.model";
import { removeAllSpaces } from "../../utility";
import {
  IRegisterRequestBody,
  ISuccessResponse,
} from "../../utility/interfaces";

const register: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, firstName, password, lastName } =
      req.body as IRegisterRequestBody;

    const trimmedFirstName = firstName ? removeAllSpaces(firstName) : null;
    const trimmedLastName = lastName ? removeAllSpaces(lastName) : null;
    const hashPassword = await hash(removeAllSpaces(password), 12);

    const newUser = await new User({
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      email: email,
      password: hashPassword,
      role: "customer",
    }).save();

    logger.info("User created successfully.");
    res.status(201).json({
      code: 201,
      data: { id: newUser.id, email: newUser.email },
      success: true,
      timeStamp: new Date(),
    } as ISuccessResponse);
  } catch (error) {
    logger.error(error);
    return next(new HttpError("User creation failed.", 500));
  }
};

export default register;
