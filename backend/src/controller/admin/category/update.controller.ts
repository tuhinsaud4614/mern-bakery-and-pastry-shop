import { RequestHandler } from "express";
import logger from "../../../logger";
import Category from "../../../model/category.model";
import { HttpError, HttpSuccess } from "../../../model/utility.model";
import {
  multipleImagesResize,
  removeAllSpaces,
  removeImagesFromDir,
} from "../../../utility";
import { PARAMS_CATEGORY_ID } from "../../../utility/constants";
import {
  ICategoryUpdateRequestBody,
  IImageProps,
} from "../../../utility/interfaces";

const updateCategory: RequestHandler<{ [PARAMS_CATEGORY_ID]: string }> = async (
  req,
  res,
  next
) => {
  const id = req.params[PARAMS_CATEGORY_ID];
  const { slug, title } = req.body as ICategoryUpdateRequestBody;
  const trimmedSlug = slug ? removeAllSpaces(slug) : undefined;
  const trimmedTitle = title ? removeAllSpaces(title) : undefined;

  try {
    const category = await Category.findOne({
      _id: id,
    }).exec();

    if (!category) {
      return next(new HttpError("Category not exist.", 404));
    }

    if (trimmedTitle) category.title = trimmedTitle;
    if (trimmedSlug) category.slug = trimmedSlug;

    let oldImage: IImageProps[] | undefined;

    if (req.file) {
      oldImage = category.image;
      category.image = await multipleImagesResize(req.file);
    }

    const updatedCategory = await category.save();
    if (oldImage) removeImagesFromDir(oldImage);

    res.status(201).json(new HttpSuccess(updatedCategory, 200).toObject());
  } catch (error) {
    console.log(error);

    logger.error("Something went wrong.");
    return next(new HttpError("Something went wrong.", 500));
  }
};

export default updateCategory;
