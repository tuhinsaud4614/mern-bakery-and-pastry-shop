import { RequestHandler } from "express";
import { Types } from "mongoose";
import logger from "../../../logger";
import Category from "../../../model/category.model";
import { HttpError, HttpSuccess } from "../../../model/utility.model";
import { CATEGORY_ID_OR_SLUG } from "../../../utility";

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

export const categoryByIdOrSlug: RequestHandler = async (req, res, next) => {
  try {
    const idOrSlug = req.params[CATEGORY_ID_OR_SLUG] as string;
    const category = await Category.findOne({
      $or: [
        { slug: idOrSlug },
        {
          // Create a demo id if not valid id
          _id: new Types.ObjectId(
            idOrSlug.length < 12 ? "123456789012" : idOrSlug
          ),
        },
      ],
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
