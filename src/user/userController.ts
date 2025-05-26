import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { userModal } from "./userModel";
import bcrypt from "bcrypt";
import { config } from "../config/config";

import { sign } from "jsonwebtoken";
import { create } from "domain";

// 1. Register User
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
  } catch (err) {
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
  } catch (err) {
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

// 2. Login User
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // 1. simple validation
  if (!email || !password) {
    return next(createHttpError(400, "All fields are required"));
  }

  // 2. Query the database
  let user;
  try {
    user = await userModal.findOne({ email });
    if (!user) {
      return next(createHttpError(404, "User not found"));
    }
  } catch (error) {
    return next(createHttpError(500, "Error while getting the user"));
  }

  //3. Compare  password received from user with database password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next(createHttpError(400, "UserName or password incorrect"));
  }

  // On Match (isMatch = true), we generate a new access token

  try {
    const token = sign({ sub: user._id }, config.jwtSecret as string, {
      expiresIn: "7d",
      algorithm: "HS256",
    });
    // 3. Response
    res.status(200).json({ accessToken: token });
  } catch (error) {
    return next(createHttpError(500, "Error while signing the jwt token"));
  }
};

export { createUser, loginUser };
