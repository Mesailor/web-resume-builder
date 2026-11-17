import express, { type Express } from "express";
import helloWorldRouter from "./routes/hello-world.ts";

const app: Express = express();
const port = 3000;

app.use("/hello-world", helloWorldRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
