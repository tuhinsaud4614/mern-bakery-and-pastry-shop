import { Router } from "express";
import adminCategoryRouter from "./admin-category.route";
import authRouter from "./auth.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/admin/category", adminCategoryRouter);

export default router;
