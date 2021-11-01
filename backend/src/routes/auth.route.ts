import { Router } from "express";
import register from "../controller/auth/register.controller";

const router = Router();

router.post(
  "/register",

  register
);

export default router;
