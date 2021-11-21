import { NextFunction, Request, RequestHandler, Response } from "express";
import { AnySchema, ValidationError } from "yup";
import logger from "../../logger";
import Category from "../../model/category.model";
import { HttpError } from "../../model/utility.model";

export const validateRequest = (schema: AnySchema, code: number = 500) => {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
        file: req.file,
        files: req.files,
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

export const categorySlugIsUnique: RequestHandler = async (req, _, next) => {
  try {
    // @ts-ignore
    const slug = req.body.slug;
    const exist = await Category.findOne({
      slug: slug,
    }).exec();

    if (exist) {
      const error = new HttpError("This category slug already exist.", 422);
      return next(error);
    }
    return next();
  } catch (error) {
    logger.error(error);
    return next(new HttpError("Something went wrong.", 500));
  }
};
