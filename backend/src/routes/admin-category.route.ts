import { Router } from "express";
import path from "path";
import createCategory from "../controller/admin/category/create.controller";
import imageUpload from "../middleware/image-upload.middleware";
import { ROOT_PATH } from "../utility";

const router = Router();

router.post(
  "/create",
  imageUpload(path.join(ROOT_PATH, "public", "images")).single("image"),
  createCategory
);

export default router;
