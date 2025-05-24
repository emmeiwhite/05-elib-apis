import { config } from "./src/config/config";
import app from "./src/app";
import connectDB from "./src/config/db";

const startServer = async () => {
  const port = config.port || 3000;

  await connectDB();

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};

startServer();
