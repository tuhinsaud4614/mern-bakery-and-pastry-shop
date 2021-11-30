import { RequestHandler } from "express";
import Category from "../../../model/category.model";
import { HttpError, HttpSuccess } from "../../../model/utility.model";
import { removeImagesFromDir } from "../../../utility";
import { PARAMS_CATEGORY_ID } from "../../../utility/constants";

const deleteCategory: RequestHandler<{ [PARAMS_CATEGORY_ID]: string }> = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params[PARAMS_CATEGORY_ID];
    const category = await Category.findOneAndRemove({
      _id: id,
    }).exec();

    if (!category) {
      return next(new HttpError("Category not exist.", 404));
    }
    removeImagesFromDir(category.image);
    res.status(200).json(new HttpSuccess(category.id).toObject());
  } catch (error) {
    console.log(error);
    return next(new HttpError("Something went wrong.", 500));
  }
};

export default deleteCategory;
