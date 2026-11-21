import express, { type Express } from "express";
import userRouter from "./routes/users.ts";

const app: Express = express();
const port = 3000;

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
