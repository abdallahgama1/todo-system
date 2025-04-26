import User from "../models/user.model.js";
import dotenv from "dotenv";
import {
    generateTokenAndSetCookie,
    clearCookie,
} from "../utils/generateToken.js";

dotenv.config();

export const signup = async (req, res) => {
    try {
        const { email, password, name, phone } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }

        const user = await User.create({ email, password, name, phone });

        if (!user) {
            return res.status(400).json({ error: "User not created" });
        }
        generateTokenAndSetCookie(user.id, res);

        res.status(201).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            },
            message: "User created successfully",
        });
    } catch (error) {
        console.log("error from signup controller :", error.message);
        res.status(500).json({ error: "Internal server error." });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(404).json({ error: "Invalid credentials" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            message: "User logged in successfully",
        });
    } catch (error) {
        console.log("error from login controller :", error.message);
        res.status(500).json({ error: "Internal server error." });
    }
};

export const logout = async (req, res) => {
    try {
        clearCookie(res);
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("error from logout controller :", error.message);
        res.status(500).json({ error: "Internal server error." });
    }
};
