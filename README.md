# 🚀 Backend Setup with TypeScript and Express

This project sets up a clean and scalable backend using **TypeScript**, **Express**, **Nodemon**, **ESLint**, and **Prettier**.

## 🛠️ Initial Setup

```bash
npm init
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

## Understanding config.ts and dotenv Setup in TypeScript Projects

In small Node/Express projects, we typically access environment variables directly like this:

```ts
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.PORT); // ✅ This works
```

✅ What's the purpose of config.ts?

For larger or scalable projects, it's a good practice to separate your configuration into a centralized file like config.ts:

```ts
// src/config/config.ts
import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT,
};

export const config = Object.freeze(_config);
```

🧠 Why use \_config and Object.freeze()?

| Feature              | Why it's used                                                               |
| -------------------- | --------------------------------------------------------------------------- |
| `_config`            | Gathers all `.env` variables in one place.                                  |
| `Object.freeze()`    | Makes the `config` object read-only — preventing accidental changes.        |
| Separate `config.ts` | Keeps your app clean, centralized, and easier to manage in large codebases. |

✅ How to use?

You can now import your configuration values like this:

```ts
import { config } from "./src/config/config";

console.log(config.port); // Safe and clean
```
