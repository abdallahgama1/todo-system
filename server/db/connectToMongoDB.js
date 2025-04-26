import mongoose from "mongoose";

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to MongoDB ");
    } catch (error) {
        console.log("Error connecting to MongoDB : ", error);
        process.exit(1);
    }
};

export default connection;
