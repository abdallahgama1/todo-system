import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connection from "./db/connectToMongoDB.js";
import { errorHandler } from "./utils/errorHandling.js";

import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:8080",
        credentials: true,
    })
);

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// app.use(errorHandler);

app.listen(PORT, () => {
    connection();
    console.log(`server is runnig http://localhost:${PORT}`);
});
