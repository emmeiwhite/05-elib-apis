import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
  try {
    // Register the events of mongoose before connection:

    mongoose.connection.on("connected", () => {
      console.log("Connected to database successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Error in connecting to database", err);
    });

    /** --- CONNECTION STRING DOING ITS JOB --- */
    await mongoose.connect(config.dbUrl as string);
  } catch (error) {
    console.log("Failed to connect to database ", error);

    // If no connection is made with the databse, then there is no point keeping the server open
    process.exit(1);
  }
};

export default connectDB;
