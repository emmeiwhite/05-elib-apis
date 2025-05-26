import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { userModal } from "./userModel";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  // 1. Validation

  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  //  1b. Database Call (check whether the user with the same email is already registered)

  const user = await userModal.findOne({ email });

  if (user) {
    const error = createHttpError(400, "User already exists with this email");
    return next(error);
  }
  // 2. Process

  // 3. Response

  res.json({ message: "User created" });
};

export { createUser };
