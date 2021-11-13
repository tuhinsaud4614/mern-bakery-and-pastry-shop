import { NextFunction, Request, Response } from "express";
import { AnySchema, ValidationError } from "yup";
import logger from "../../logger";
import { HttpError } from "../../model/utility.model";

export const validateRequest = (schema: AnySchema, code: number = 500) => {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
      return;
    } catch (er) {
      const { message } = er as ValidationError;
      logger.error(message);
      const error = new HttpError(message, code);
      next(error);
      return error;
    }
  };
};
