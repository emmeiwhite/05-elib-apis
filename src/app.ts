import { config } from "./config/config";
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";

const app = express();

// Routes:

app.get("/", (req, res, next) => {
  const error = createHttpError();

  throw error;
  res.json({
    message: "Welcome to elib apis",
  });
});

// Global Error Handler is a special type of middleware (we can say)
app.use(((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 5000;

  res.status(statusCode).json({
    message: err.message,
    errorStack: config.env === "development" ? err.stack : "",
  });
}) as express.ErrorRequestHandler);

export default app;
