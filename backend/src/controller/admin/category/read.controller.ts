import { RequestHandler } from "express";
import logger from "../../../logger";
import Category from "../../../model/category.model";
import { HttpError, HttpSuccess } from "../../../model/utility.model";

const allCategories: RequestHandler = async (_, res, next) => {
  try {
    const categories = await Category.find().exec();
    res.status(200).json(new HttpSuccess(categories, 200).toObject());
  } catch (error) {
    console.log(error);
    logger.error("Something went wrong.");
    return next(new HttpError("Something went wrong.", 404));
  }
};

export default allCategories;
