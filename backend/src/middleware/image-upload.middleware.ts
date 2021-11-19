import { randomBytes } from "crypto";
import { mkdirSync } from "fs";
import multer, { diskStorage } from "multer";
import { HttpError } from "../model/utility.model";
import { IMAGE_MIME_TYPE } from "../utility";
import { ImageMIMEType } from "../utility/types";

const MAX_FILE_SIZE = 1024 ** 3;

const imageUpload = (filePath: string, fileSize: number = MAX_FILE_SIZE) => {
  return multer({
    limits: { fileSize: fileSize },
    storage: diskStorage({
      destination(_, __, cb) {
        mkdirSync(filePath, { recursive: true });
        cb(null, filePath);
      },
      filename(_, file, cb) {
        if (!(file.mimetype in IMAGE_MIME_TYPE)) {
          return cb(new HttpError("Invalid image type.", 422), "");
        }
        const ext = IMAGE_MIME_TYPE[file.mimetype as ImageMIMEType];
        const imageName = `${randomBytes(4).toString("hex")}-${randomBytes(
          4
        ).toString("hex")}.${ext}`;
        cb(null, imageName);
      },
    }),
    fileFilter(_, file, cb) {
      if (!(file.mimetype in IMAGE_MIME_TYPE)) {
        return cb(new HttpError("Invalid image type.", 422));
      }
      cb(null, true);
    },
  });
};

export default imageUpload;
