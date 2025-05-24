# 🚀 Backend Setup with TypeScript and Express

This project sets up a clean and scalable backend using **TypeScript**, **Express**, **Nodemon**, **ESLint**, and **Prettier**.

## 🛠️ Initial Setup

```bash
npm init
```

```

```

Install development dependencies:

```bash
npm install typescript nodemon ts-node @types/node --save-dev
```

Initialize the TypeScript configuration:

```bash
npx tsc --init
```

Use a `.gitignore` generator or extension to create a `.gitignore` file.

Add a development script to your `package.json`:

```json
"scripts": {
  "dev": "nodemon server.ts"
}
```

Set up ESLint:

```bash
npm init @eslint/config
```

Set up Prettier for code formatting (optional):

Create a `.prettierrc` file:

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5"
}
```

## 🌐 Setup Express Server

Install Express and its TypeScript types:

```bash
npm install express
npm install -D @types/express
```

Create a `src` directory, and inside it create `app.ts`:

```ts
// src/app.ts
import express from "express";

const app = express();

export default app;
```

Now, in the root directory, create a `server.ts` file and start the server:

```ts
// server.ts
import app from "./src/app";

const startServer = () => {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`🚀 Server is listening on port ${port}`);
  });
};

startServer();
```
