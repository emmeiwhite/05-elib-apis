import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { userModal } from "./userModel";
import bcrypt from "bcrypt";
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

  /// Now we need to create user and store in the database, but before that we require to hash the password because passwords are not stored in the raw form as they come.

  // Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  /** Time to store user in the database */
  // Save user
  const newUser = await userModal.create({
    name,
    email,
    password: hashedPassword,
  });

  /** Because we send back the response, we need to generate Token */

  // 3. Response
  res.json({ id: newUser._id });
};

export { createUser };
