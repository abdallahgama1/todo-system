import { body } from "express-validator";

export const validateUpdateProfile = [
    body("name").optional().isString().withMessage("name must be a string"),
    body("email").optional().isEmail().withMessage("Invalid Email Address"),
    body("phone")
        .optional()
        .isMobilePhone()
        .withMessage("Invalid Phone Number"),
    body("password")
        .optional()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];
