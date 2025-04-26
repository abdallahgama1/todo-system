import Todo from "../models/todo.model.js";

export const getAllTodos = async (req, res) => {
    try {
        let { page = 1, limit = 10, sort = "-createdAt", status } = req.query;

        // Ensure page and limit are valid numbers
        page = Math.max(1, parseInt(page, 10) || 1);
        limit = Math.max(1, parseInt(limit, 10) || 10);

        const query = { userId: req.user._id };

        // Only add status to the query if it's valid
        if (status && status !== "all") {
            query.status = status;
        }
        const [todos, total] = await Promise.all([
            Todo.find(query)
                .sort(sort)
                .limit(limit)
                .skip((page - 1) * limit)
                .lean(),
            Todo.countDocuments({ userId: req.user._id }),
        ]);

        res.status(200).json({
            todos,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        });
    } catch (error) {
        console.log("error from getAllTodos controller :", error.message);
        res.status(500).json({ error: "Internal server error." });
    }
};

export const getTodo = async (req, res) => {
    try {
        const todo = await Todo.findOne({
            _id: req.params.id,
            userId: req.user._id,
        }).lean();

        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.status(200).json({ todo });
    } catch (error) {
        console.log("error from getTodo controller :", error.message);
        res.status(500).json({ error: "Internal server error." });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const allowedFields = ["title", "description"];
        console.log(req.params.id);
        const updatedData = {};
        allowedFields.forEach((field) => {
            if (req.body[field]) updatedData[field] = req.body[field];
        });
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            updatedData,
            {
                new: true,
                runValidators: true,
            }
        );
        res.status(200).json({ todo });
    } catch (error) {
        console.log("error from updateTodo controller :", error.message);
        res.status(500).json({ error: "Internal server error." });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.log("error from deleteTodo controller :", error.message);
        res.status(500).json({ error: "Internal server error." });
    }
};

export const addTodo = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        const todo = await Todo.create({
            title,
            description,
            status,
            userId: req.user._id,
        });

        res.status(201).json({ todo });
    } catch (error) {
        console.log("error from addTodo controller :", error.message);
        res.status(500).json({ error: "Internal server error." });
    }
};

export const toggleTodoStatus = async (req, res) => {
    try {
        const todo = await Todo.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });
        todo.status = todo.status === "completed" ? "pending" : "completed";
        console.log(todo.status);
        await todo.save();
        res.status(200).json({ todo });
    } catch (error) {
        console.log("error from toggleTodoStatus controller :", error.message);
        res.status(500).json({ error: "Internal server error." });
    }
};
