import { Router } from "express";
import createCategory from "../controller/admin/category/create.controller";
import deleteCategory from "../controller/admin/category/delete.controller";
import allCategories, {
  categoryById,
} from "../controller/admin/category/read.controller";
import updateCategory from "../controller/admin/category/update.controller";
import imageUpload from "../middleware/image-upload.middleware";
import {
  categorySlugIsUnique,
  validateRequest,
} from "../middleware/validation/index.middleware";
import {
  categoryRequestBodySchema,
  paramsIsValidObjectIdSchema,
} from "../schema/validation.schema";
import { PARAMS_CATEGORY_ID } from "../utility/constants";

const router = Router();

router.get("/", allCategories);

router.post(
  "/",
  imageUpload().single("image"),
  validateRequest(categoryRequestBodySchema, 422),
  categorySlugIsUnique,
  createCategory
);

router.get(
  `/:${PARAMS_CATEGORY_ID}`,
  validateRequest(
    paramsIsValidObjectIdSchema(PARAMS_CATEGORY_ID, "Category not exists."),
    400
  ),
  categoryById
);

router.put(
  `/:${PARAMS_CATEGORY_ID}`,
  imageUpload().single("image"),
  validateRequest(
    paramsIsValidObjectIdSchema(PARAMS_CATEGORY_ID, "Category not exists."),
    400
  ),
  categorySlugIsUnique,
  updateCategory
);

router.delete(
  `/:${PARAMS_CATEGORY_ID}`,
  validateRequest(
    paramsIsValidObjectIdSchema(PARAMS_CATEGORY_ID, "Category not exists."),
    400
  ),
  deleteCategory
);

export default router;
