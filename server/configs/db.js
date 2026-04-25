import mongoose from "mongoose";

const connectDb = async () => {
  try {
    console.log("⏳ Connecting to MongoDB...");

    let mongoDbURI = process.env.MONGODB_URI;
    const projectName = "resume-builder";

    if (!mongoDbURI) {
      throw new Error("MONGODB_URI environment variable not set");
    }

    if (mongoDbURI.endsWith("/")) {
      mongoDbURI = mongoDbURI.slice(0, -1);
    }

    const conn = await mongoose.connect(`${mongoDbURI}/${projectName}`);

    console.log("✅ Database connected successfully");

  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
};

export default connectDb;