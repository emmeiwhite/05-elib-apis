import express from "express";

const userRouter = express.Router();

// Create Routes
userRouter.post("/register", (req, res, next) => {
  res.json({
    message: "user registered",
  });
});

export default userRouter;
