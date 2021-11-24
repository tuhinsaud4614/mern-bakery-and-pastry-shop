import { Router } from "express";
import createCategory from "../controller/admin/category/create.controller";
import allCategories, {
  categoryByIdOrSlug,
} from "../controller/admin/category/read.controller";
import imageUpload from "../middleware/image-upload.middleware";
import resizeImages from "../middleware/resize-images.middleware";
import {
  categorySlugIsUnique,
  validateRequest,
} from "../middleware/validation/index.middleware";
import { categoryRequestBodySchema } from "../schema/validation.schema";
import { CATEGORY_ID_OR_SLUG } from "../utility";

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

router.get(`/:${CATEGORY_ID_OR_SLUG}`, categoryByIdOrSlug);

export default router;
