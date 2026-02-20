import mongoose from "mongoose";

async function connectToDatabase() {
    if (!process.env.MONGODB_URI) {
        console.error("CRITICAL: MONGODB_URI is not defined in environment variables!");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to the database successfully");
    } catch (error) {
        console.error("MongoDB Connection Error Details:", error.message);
    }
}

export default connectToDatabase;