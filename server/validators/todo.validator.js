import { param, body, query } from "express-validator";

export const validateTodoId = [
    param("id").isMongoId().withMessage("Invalid MongoDB ObjectId"),
];

export const getAllTodosValidator = [
    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be a number greater than 0"),
    query("limit")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Limit must be a number greater than 0"),
    query("sort").optional().isString().withMessage("Sort must be a string"),
    query("status")
        .optional()
        .isIn(["pending", "completed", "all"])
        .withMessage("Status must be 'pending' or 'completed' or 'all'"),
];

export const validateAddTodo = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),
    body("status")
        .optional()
        .isIn(["pending", "completed"])
        .withMessage("Status must be 'pending' or 'completed'"),
];

export const validateUpdateTodo = [
    body("title").optional().isString().withMessage("Title must be a string"),
    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),
    body("status")
        .optional()
        .isIn(["pending", "completed"])
        .withMessage("Status must be 'pending' or 'completed'"),
];
