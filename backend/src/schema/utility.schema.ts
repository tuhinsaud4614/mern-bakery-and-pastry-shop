import { SchemaDefinition } from "mongoose";
import { IImageProps } from "../utility/interfaces";

export const ImageSchemaDefinition: SchemaDefinition<IImageProps> = {
  name: { type: String, required: true },
  ext: {
    type: String,
    required: true,
    enum: {
      values: ["jpeg", "jpg", "png", "gif", "svg", "webp"],
      message:
        "{VALUE} must be valid image extension like (jpeg , jpg , png , gif , svg , webp)",
    },
  },
  uri: { type: String, required: true, unique: true },
  baseName: { type: String, required: true },
};
