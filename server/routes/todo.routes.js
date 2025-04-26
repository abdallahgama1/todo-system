import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
    getAllTodos,
    getTodo,
    updateTodo,
    deleteTodo,
    addTodo,
    toggleTodoStatus,
} from "../controllers/todo.controller.js";
import {
    validateTodoId,
    validateAddTodo,
    getAllTodosValidator,
} from "../validators/todo.validator.js";
import { handleValidationErrors } from "../utils/handleValidationErrors.js";

const validate = (validations) => [...validations, handleValidationErrors];
const router = express.Router();

router.get("/", protectRoute, validate(getAllTodosValidator), getAllTodos);
router.get("/:id", protectRoute, validate(validateTodoId), getTodo);
router.post("/", protectRoute, validate(validateAddTodo), addTodo);
router.patch("/:id", protectRoute, validate(validateTodoId), updateTodo);
router.patch(
    "/toggle/:id",
    protectRoute,
    validate(validateTodoId),
    toggleTodoStatus
);
router.delete("/:id", protectRoute, validate(validateTodoId), deleteTodo);

export default router;
