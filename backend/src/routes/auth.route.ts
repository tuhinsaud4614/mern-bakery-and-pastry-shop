import { Router } from "express";
import register from "../controller/auth/register.controller";
import { userExistenceValidate } from "../middleware";
import { validateRequest } from "../middleware/validation/index.middleware";
import { registerRequestBodySchema } from "../schema/validation.schema";

const router = Router();

router.post(
  "/register",
  [
    validateRequest(registerRequestBodySchema, 422),
    userExistenceValidate("exist", 422),
  ],
  register
);

export default router;
