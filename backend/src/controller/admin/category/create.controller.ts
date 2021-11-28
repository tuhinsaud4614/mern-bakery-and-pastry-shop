import { RequestHandler } from "express";
import logger from "../../../logger";
import Category from "../../../model/category.model";
import { HttpError } from "../../../model/utility.model";
import { multipleImagesResize, removeAllSpaces } from "../../../utility";
import {
  ICategoryCreateRequestBody,
  ISuccessResponse,
} from "../../../utility/interfaces";

const createCategory: RequestHandler = async (req, res, next) => {
  const { slug, title } = req.body as ICategoryCreateRequestBody;
  const trimmedSlug = removeAllSpaces(slug);
  const trimmedTitle = removeAllSpaces(title);

  try {
    const images = await multipleImagesResize(req.file!);
    const newCategory = await new Category({
      title: trimmedTitle,
      slug: trimmedSlug,
      image: images,
    }).save();

    res.status(201).json({
      code: 201,
      data: newCategory,
      success: true,
      timeStamp: new Date(),
    } as ISuccessResponse);
  } catch (error) {
    logger.error("Something went wrong.", error);
    return next(new HttpError("Something went wrong.", 500));
  }
};

export default createCategory;
