import { RequestHandler } from "express";
import path from "path";
import logger from "../logger";
import { HttpError } from "../model/utility.model";
import { imageResize, ROOT_PATH, uniqueId } from "../utility";

const resizeImages: RequestHandler = async (req, __, next) => {
  const imageName = uniqueId();
  const location = path.join(ROOT_PATH, "public", "images");

  try {
    const result = await Promise.all([
      ...imageResize(imageName, req.file!.buffer, location, "jpeg", [
        { height: null, width: null, baseName: "main" },
        { height: (640 / 16) * 9, width: 640, baseName: "sm" },
        { height: (768 / 16) * 9, width: 768, baseName: "md" },
        { height: (1280 / 16) * 9, width: 1280, baseName: "lg" },
      ]),
      ...imageResize(imageName, req.file!.buffer, location, "webp", [
        { height: (640 / 16) * 9, width: 640, baseName: "sm" },
        { height: (768 / 16) * 9, width: 768, baseName: "md" },
        { height: (1280 / 16) * 9, width: 1280, baseName: "lg" },
      ]),
    ]);

    // @ts-ignore
    req.images = result;
    return next();
  } catch (error) {
    logger.error("Something went wrong.");
    return next(new HttpError("Something went wrong.", 500));
  }
};

export default resizeImages;
