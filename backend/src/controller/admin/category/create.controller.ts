import { RequestHandler } from "express";
import Category from "../../../model/category.model";
import { IMAGE_MIME_TYPE } from "../../../utility";
import { ISuccessResponse } from "../../../utility/interfaces";
import { ImageMIMEType } from "../../../utility/types";

const createCategory: RequestHandler = async (req, res, __) => {
  console.log(req.file);

  try {
    const newCategory = new Category({
      title: req.body["title"],
      slug: req.body["slug"],
      image: {
        main: {
          name: req.file?.filename,
          ext: IMAGE_MIME_TYPE[req.file?.mimetype as ImageMIMEType],
          uri: `images/${req.file?.filename}`,
        },
        smWebp: {
          name: req.file?.filename,
          ext: IMAGE_MIME_TYPE[req.file?.mimetype as ImageMIMEType],
          uri: `images/${req.file?.filename}`,
        },
        mdWebp: {
          name: req.file?.filename,
          ext: IMAGE_MIME_TYPE[req.file?.mimetype as ImageMIMEType],
          uri: `images/${req.file?.filename}`,
        },
        lgWebp: {
          name: req.file?.filename,
          ext: IMAGE_MIME_TYPE[req.file?.mimetype as ImageMIMEType],
          uri: `images/${req.file?.filename}`,
        },
        sm: {
          name: req.file?.filename,
          ext: IMAGE_MIME_TYPE[req.file?.mimetype as ImageMIMEType],
          uri: `images/${req.file?.filename}`,
        },
        md: {
          name: req.file?.filename,
          ext: IMAGE_MIME_TYPE[req.file?.mimetype as ImageMIMEType],
          uri: `images/${req.file?.filename}`,
        },
        lg: {
          name: req.file?.filename,
          ext: IMAGE_MIME_TYPE[req.file?.mimetype as ImageMIMEType],
          uri: `images/${req.file?.filename}`,
        },
      },
    });
    await newCategory.save();
    res.status(201).json({
      code: 201,
      data: newCategory.toJSON({ getters: true }),
      success: true,
      timeStamp: new Date(),
    } as ISuccessResponse);
  } catch (error) {}
};

export default createCategory;
