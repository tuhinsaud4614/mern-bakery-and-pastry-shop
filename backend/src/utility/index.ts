import { randomBytes } from "crypto";
import { existsSync, mkdirSync, unlink } from "fs";
import path from "path";
import sharp, { FormatEnum } from "sharp";
import logger from "../logger";
import { ROOT_PATH } from "./constants";
import { IImageProps } from "./interfaces";
import { ImageExtType, ImageMIMEType } from "./types";

export const errorAccordingStatusCode = (code: number) => {
  switch (code) {
    case 301:
      return "Moved Permanently";
    case 400:
      return "Bad Request";
    case 401:
      return "Unauthorized";
    case 402:
      return "Payment Required";
    case 403:
      return "Forbidden";
    case 404:
      return "Not Found";
    case 415:
      // The request entity has a media type which the server or resource does not support. For example, the client uploads an image as image/svg+xml, but the server requires that images use a different format.[49]
      return "Unsupported Media Type";
    case 422:
      // Invalid Inputs
      return "Unprocessable Entity";
    case 429:
      return "Too Many Requests";
    case 431:
      return "Request Header Fields Too Large";
    case 500:
      return "Internal Server Error";
    default:
      return "An unknown error occurred";
  }
};

export const removeAllSpaces = (value: string): string => {
  return value.replace(/\s+/g, " ").trim();
};

export const IMAGE_MIME_TYPE: { [key in ImageMIMEType]: ImageExtType } = {
  "image/gif": "gif",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/svg": "svg",
  "image/webp": "webp",
};

export const uniqueId = (block: number = 4, blockCount: number = 2) => {
  return Array.from({ length: block }, () =>
    randomBytes(blockCount).toString("hex")
  ).join("-");
};

export const imageResize = (
  imageName: string,
  imagePath:
    | Buffer
    | Uint8Array
    | Uint8ClampedArray
    | Int8Array
    | Uint16Array
    | Int16Array
    | Uint32Array
    | Int32Array
    | Float32Array
    | Float64Array
    | string,
  location: string,
  format: keyof FormatEnum,
  sizes: { width: number | null; height: number | null; baseName: string }[]
) => {
  if (!existsSync(location)) {
    mkdirSync(location, { recursive: true });
  }
  return sizes.map(async (size) => {
    const ratioText =
      size.width && size.height ? `-${size.width}x${size.height}` : "";
    const newName = `${imageName}${ratioText}.${format}`;
    await sharp(imagePath)
      .resize(size.width, size.height)
      .toFormat(format)
      .toFile(path.join(location, newName));
    return {
      name: newName,
      uri: `images/${newName}`,
      ext: format,
      baseName: size.baseName,
    };
  });
};

export const multipleImagesResize = async (file: Express.Multer.File) => {
  const imageName = uniqueId();
  const location = path.join(ROOT_PATH, "public", "images");

  const result = await Promise.all([
    ...imageResize(imageName, file.buffer, location, "jpeg", [
      { height: null, width: null, baseName: "main" },
      { height: (640 / 16) * 9, width: 640, baseName: "sm" },
      { height: (768 / 16) * 9, width: 768, baseName: "md" },
      { height: (1280 / 16) * 9, width: 1280, baseName: "lg" },
    ]),
    ...imageResize(imageName, file.buffer, location, "webp", [
      { height: (640 / 16) * 9, width: 640, baseName: "sm" },
      { height: (768 / 16) * 9, width: 768, baseName: "md" },
      { height: (1280 / 16) * 9, width: 1280, baseName: "lg" },
    ]),
  ]);

  return result;
};

export const removeImagesFromDir = (images: IImageProps[]) => {
  images.forEach((img) => {
    unlink(path.join(ROOT_PATH, "/public", img.uri), (err) => {
      if (err) {
        console.log(err);
        logger.error(`${img.name}: file not remove`);
      }
    });
  });
};
