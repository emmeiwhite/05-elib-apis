import { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import { userModal } from "./userModel";
import bcrypt from "bcrypt";
import { config } from "../config/config";

import { sign } from "jsonwebtoken";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  // 1. Validation

  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  //  1b. Database Call
  try {
    const user = await userModal.findOne({ email });

    if (user) {
      const error = createHttpError(400, "User already exists with this email");
      return next(error);
    }
  } catch (error) {
    return next(createHttpError(500, "Error while getting user"));
  }

  // 2. Process
  let newUser;
  try {
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    /** Time to store user in the database */
    // Save user
    newUser = await userModal.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while creating resource"));
  }

  /** Because we send back the response, we need to generate Token */

  try {
    // Token Generation: JWT token to be generated
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
      algorithm: "HS256",
    });
    // 3. Response
    res.status(201).json({ message: "User Created", accessToken: token });
  } catch (error) {
    return next(createHttpError(500, "Error while signing the jwt token"));
  }
};

export { createUser };
