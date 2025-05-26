import express from "express";
import createHttpError from "http-errors";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";

const app = express();

// register express.json() to parse req.body

app.use(express.json());

// Test  Route:
app.get("/", (req, res, next) => {
  const error = createHttpError();

  throw error;
  res.json({
    message: "Welcome to elib apis",
  });
});

// Register the router
app.use("/api/users", userRouter);

// Keep it as the very last of the routes (Global Error Handler)
app.use(globalErrorHandler);

export default app;
