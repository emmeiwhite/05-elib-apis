import mongoose from "mongoose";
import { User } from "./userTypes";

// 1. Create Schema of our User (How should our document structure look like in the database)

const userSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// 2. Create Modal
export const userModal = mongoose.model<User>("User", userSchema);
