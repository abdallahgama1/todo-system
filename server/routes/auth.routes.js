import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { validateSignup, validateLogin } from "../validators/auth.validator.js";
import { handleValidationErrors } from "../utils/handleValidationErrors.js";

const validate = (validations) => [...validations, handleValidationErrors];
const router = express.Router();

router.post("/signup", validate(validateSignup), signup);
router.post("/login", validate(validateLogin), login);
router.post("/logout", logout);

export default router;
