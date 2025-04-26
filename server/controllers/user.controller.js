import User from "../models/user.model.js";

export const viewProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        console.log("error in viewProfile controller ", error.message);
        res.status(500).json({ message: " internal server error " });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const allowedFields = ["name", "email", "password", "phone"];
        const updatedData = {};
        allowedFields.forEach((field) => {
            if (req.body[field]) updatedData[field] = req.body[field];
        });

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $set: updatedData },
            { new: true }
        ).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        console.log("error in updateProfile controller ", error.message);
        res.status(500).json({ message: " internal server error " });
    }
};
