import { RequestHandler } from "express";
import { isValidObjectId } from "mongoose";
import Category from "../../../model/category.model";
import { HttpError, HttpSuccess } from "../../../model/utility.model";
import { CATEGORY_ID_OR_SLUG, removeImagesFromDir } from "../../../utility";

const deleteCategory: RequestHandler<{ [CATEGORY_ID_OR_SLUG]: string }> =
  async (req, res, next) => {
    try {
      const idOrSlug = req.params[CATEGORY_ID_OR_SLUG];
      const category = await Category.findOneAndRemove({
        $or: [
          { slug: idOrSlug },
          {
            _id: isValidObjectId(idOrSlug) ? idOrSlug : undefined,
          },
        ],
      }).exec();

      if (!category) {
        return next(new HttpError("Category not exist.", 404));
      }
      removeImagesFromDir(category.image);
      res.status(200).json(new HttpSuccess(category.id, 200).toObject());
    } catch (error) {
      console.log(error);
      return next(new HttpError("Something went wrong.", 500));
    }
  };

export default deleteCategory;
