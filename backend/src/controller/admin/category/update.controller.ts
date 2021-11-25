import { RequestHandler } from "express";
import { isValidObjectId } from "mongoose";
import logger from "../../../logger";
import Category from "../../../model/category.model";
import { HttpError, HttpSuccess } from "../../../model/utility.model";
import {
  CATEGORY_ID_OR_SLUG,
  removeAllSpaces,
  removeImagesFromDir,
} from "../../../utility";
import { ICategoryUpdateRequestBody } from "../../../utility/interfaces";

const updateCategory: RequestHandler<{ [CATEGORY_ID_OR_SLUG]: string }> =
  async (req, res, next) => {
    const idOrSlug = req.params[CATEGORY_ID_OR_SLUG];
    const { slug, title } = req.body as ICategoryUpdateRequestBody;
    const trimmedSlug = slug ? removeAllSpaces(slug) : undefined;
    const trimmedTitle = title ? removeAllSpaces(title) : undefined;

    // @ts-ignore
    const result = req.images as IImageProps[] | undefined;

    try {
      const category = await Category.findOneAndUpdate(
        {
          $or: [
            { slug: idOrSlug },
            {
              _id: isValidObjectId(idOrSlug) ? idOrSlug : undefined,
            },
          ],
        },
        { title: trimmedTitle, slug: trimmedSlug, image: result }
      ).exec();

      if (!category) {
        return next(new HttpError("Category not exist.", 404));
      }

      if (result) {
        removeImagesFromDir(category.image);
      }

      res.status(201).json(new HttpSuccess(category._id, 201).toObject());
    } catch (error) {
      console.log(error);

      logger.error("Something went wrong.");
      return next(new HttpError("Something went wrong.", 500));
    }
  };

export default updateCategory;
