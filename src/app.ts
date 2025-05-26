import express, { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

const app = express();

// Routes:

app.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to elib apis",
  });
});

// Global Error Handler is a special type of middleware (we can say)

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 5000;
});
export default app;
