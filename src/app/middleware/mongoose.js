const mongoose = require("mongoose")
import dotenv from "dotenv";
dotenv.config();
const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      serverSelectionTimeoutMS: 1000,
      socketTimeoutMS: 120000,
      connectTimeoutMS: 120000,
    });
    console.log("✅ Connected to Database successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}

export default connectToMongo;