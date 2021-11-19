import path from "path";
import { ImageExtType, ImageMIMEType } from "./types";

export const removeAllSpaces = (value: string): string => {
  return value.replace(/\s+/g, " ").trim();
};

export const ROOT_PATH = path.join(__dirname, "..", "..");

export const IMAGE_MIME_TYPE: { [key in ImageMIMEType]: ImageExtType } = {
  "image/gif": "gif",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/svg": "svg",
  "image/webp": "webp",
};
