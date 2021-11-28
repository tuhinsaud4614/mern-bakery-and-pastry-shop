import { RequestHandler } from "express";
import logger from "../../../logger";
import Category from "../../../model/category.model";
import { HttpError, HttpSuccess } from "../../../model/utility.model";
import { PARAMS_CATEGORY_ID } from "../../../utility/constants";

const allCategories: RequestHandler = async (_, res, next) => {
  try {
    const categories = await Category.find().select("-__v").exec();
    res.status(200).json(new HttpSuccess(categories, 200).toObject());
  } catch (error) {
    console.log(error);
    logger.error("Something went wrong.");
    return next(new HttpError("Something went wrong.", 500));
  }
};

export const categoryById: RequestHandler<{
  [PARAMS_CATEGORY_ID]: string;
}> = async (req, res, next) => {
  try {
    const id = req.params[PARAMS_CATEGORY_ID];

    const category = await Category.findOne({
      _id: id,
    })
      .select("-__v -image._id")
      .exec();

    if (!category) {
      return next(new HttpError("Category not found.", 404));
    }
    res.status(200).json(new HttpSuccess(category, 200).toObject());
  } catch (error) {
    return next(new HttpError("Something went wrong.", 500));
  }
};

export default allCategories;
