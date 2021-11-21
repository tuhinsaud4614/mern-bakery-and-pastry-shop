import { RequestHandler } from "express";
import logger from "../../../logger";
import Category from "../../../model/category.model";
import { HttpError } from "../../../model/utility.model";
import { removeAllSpaces } from "../../../utility";
import {
  ICategoryCreateRequestBody,
  ISuccessResponse,
} from "../../../utility/interfaces";

const createCategory: RequestHandler = async (req, res, next) => {
  const { slug, title } = req.body as ICategoryCreateRequestBody;
  const trimmedSlug = removeAllSpaces(slug);
  const trimmedTitle = removeAllSpaces(title);

  // @ts-ignore
  const result = req.images as IResizeImage[];
  try {
    const newCategory = await new Category({
      title: trimmedTitle,
      slug: trimmedSlug,
      image: result,
    }).save();

    res.status(201).json({
      code: 201,
      data: newCategory.toJSON({ getters: true }),
      success: true,
      timeStamp: new Date(),
    } as ISuccessResponse);
  } catch (error) {
    console.log(error);

    logger.error("Something went wrong.");
    return next(new HttpError("Something went wrong.", 500));
  }
};

export default createCategory;
