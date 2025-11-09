import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env file");
}

export const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Database connection error:", error.message);
    throw error; // Re-throw to handle it in the API route if needed
  }
};
