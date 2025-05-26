import express from "express";
import createHttpError from "http-errors";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app = express();

// Routes:
app.get("/", (req, res, next) => {
  const error = createHttpError();

  throw error;
  res.json({
    message: "Welcome to elib apis",
  });
});

// Keep it as the very last of the routes (Global Error Handler)
app.use(globalErrorHandler);

export default app;
