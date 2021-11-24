import { RequestHandler } from "express";
import { unlink } from "fs";
import { Types } from "mongoose";
import path from "path";
import logger from "../../../logger";
import Category from "../../../model/category.model";
import { HttpError, HttpSuccess } from "../../../model/utility.model";
import { CATEGORY_ID_OR_SLUG, ROOT_PATH } from "../../../utility";

const deleteCategory: RequestHandler = async (req, res, next) => {
  try {
    const idOrSlug = req.params[CATEGORY_ID_OR_SLUG] as string;
    const category = await Category.findOneAndRemove({
      $or: [
        { slug: idOrSlug },
        {
          // Create a demo id if not valid id
          _id: new Types.ObjectId(
            idOrSlug.length < 12 ? "123456789012" : idOrSlug
          ),
        },
      ],
    }).exec();

    if (!category) {
      return next(new HttpError("Category not exist.", 404));
    }

    category.image.forEach((img) => {
      unlink(path.join(ROOT_PATH, "/public", img.uri), (err) => {
        if (err) {
          logger.error(`${img.name}: file not remove`);
        }
      });
    });

    res.status(200).json(new HttpSuccess(category.id, 200).toObject());
  } catch (error) {
    console.log(error);
    return next(new HttpError("Something went wrong.", 500));
  }
};

export default deleteCategory;
