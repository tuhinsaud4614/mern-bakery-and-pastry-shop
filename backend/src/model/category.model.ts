import { model, Schema } from "mongoose";
import { IImage, ImageSchema } from "./utility.model";

export interface ICategory extends Document {
  title: string;
  slug: string;
  image: IImage;
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
    image: ImageSchema,
  },
  { timestamps: true }
);

const Category = model<ICategory>("Category", CategorySchema);
export default Category;
