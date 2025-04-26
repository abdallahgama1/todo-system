import express from "express";
import { viewProfile, updateProfile } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { validateUpdateProfile } from "../validators/user.validator.js";
import { handleValidationErrors } from "../utils/handleValidationErrors.js";

const validate = (validations) => [...validations, handleValidationErrors];
const router = express.Router();

router.get("/", protectRoute, viewProfile);
router.patch("/", protectRoute, validate(validateUpdateProfile), updateProfile);

export default router;
