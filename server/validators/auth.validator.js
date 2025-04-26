import { body } from "express-validator";

export const validateSignup = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Invalid Email Address"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    body("phone").isMobilePhone().withMessage("Invalid Phone Number"),
];

export const validateLogin = [
    body("email").isEmail().withMessage("Invalid Email Address"),
    body("password").notEmpty().withMessage("Invalid Credentials"),
];
