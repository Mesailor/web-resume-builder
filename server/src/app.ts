import express, { type Express } from "express";
import userRouter from "./routes/users.ts";
import { errorHandler } from "./middlewares/error-handler.ts";
import { NotFoundError } from "./utils/http-error.ts";

const app: Express = express();
const port = 3000;

app.use(express.json());

app.use("/users", userRouter);

app.use((req, res) => {
  throw new NotFoundError("Route not found");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
