import { NextFunction, Request, RequestHandler, Response } from "express";
import { ISuccessResponse } from "../../utility/interfaces";

const register: RequestHandler = (
  _: Request,
  res: Response,
  __: NextFunction
) => {
  res.status(200).json({
    code: 200,
    data: "ok",
    success: true,
    timeStamp: new Date(),
  } as ISuccessResponse);
};

export default register;
