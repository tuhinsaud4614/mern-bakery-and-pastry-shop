import { Router } from "express";
import createCategory from "../controller/admin/category/create.controller";
import allCategories from "../controller/admin/category/read.controller";
import imageUpload from "../middleware/image-upload.middleware";
import resizeImages from "../middleware/resize-images.middleware";
import {
  categorySlugIsUnique,
  validateRequest,
} from "../middleware/validation/index.middleware";
import { categoryRequestBodySchema } from "../schema/validation.schema";

const router = Router();

router.get("/", allCategories);

router.post(
  "/create",
  imageUpload().single("image"),
  validateRequest(categoryRequestBodySchema, 422),
  categorySlugIsUnique,
  resizeImages,
  createCategory
);

export default router;
