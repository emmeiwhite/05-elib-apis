# Getting started with Backend setup from the very start

- Create package.json file with the command `npm init`

- Download dev dependencies
  `npm install typescript nodemon ts-node @types/node`

- After installation setup the `tsconfig` file
  `npx tsc --init`

- added gitignore extension to generate .gitignore file

- setup dev script: `nodemon server.ts`

- setup eslint `npm init @eslint/config`

- setup prettier for code formatting

# SETUP EXPRESS SERVER

- We will setup express server for API creation
- The server should be up & running continuously to serve client requests

- `npm i express` & `npm i -D @types/express`

## How to start express server?

- Make sure to create a src folder and create `app.ts` file:

- Then setup express app

```
   import express from "express";

   const app = express();

   export default app;
```

- Then import the app in server.ts file and startServer neatly:

```
import app from "./src/app";

const startServer = () => {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};

startServer();
```
