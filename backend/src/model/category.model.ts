import { model, Schema } from "mongoose";
import { ImageSchemaDefinition } from "../schema/utility.schema";
import { IImageProps } from "../utility/interfaces";

export interface ICategory extends Document {
  title: string;
  slug: string;
  image: IImageProps[];
}

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    image: [ImageSchemaDefinition],
  },

  { timestamps: true }
);

const Category = model<ICategory>("Category", CategorySchema);
export default Category;
