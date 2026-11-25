import express from "express";
import { db } from "../prisma/db.ts";
import { isValidObjectId } from "../utils/index.ts";
import { BadRequestError, NotFoundError } from "../utils/http-error.ts";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  const isValidId = isValidObjectId(req.params.userId);
  if (!isValidId) {
    throw new BadRequestError("Invalid user ID");
  }

  const user = await db.orm.users.where({ id: req.params.userId }).first();
  if (!user) {
    throw new NotFoundError("User not found");
  }

  res.send(user);
});

router.post("/", async (req, res) => {
  const { name, email } = req.body;
  const newUser = await db.orm.users.create({ name, email });
  res.send(newUser);
});

router.put("/:userId", async (req, res) => {
  const isValidId = isValidObjectId(req.params.userId);
  if (!isValidId) {
    throw new BadRequestError("Invalid user ID");
  }

  const { name, email } = req.body;
  const updatedUser = await db.orm.users
    .where({ id: req.params.userId })
    .update({ name, email });
  res.send(updatedUser);
});

router.delete("/:userId", async (req, res) => {
  const isValidId = isValidObjectId(req.params.userId);
  if (!isValidId) {
    throw new BadRequestError("Invalid user ID");
  }

  await db.orm.users.where({ id: req.params.userId }).delete();
  res.send({ message: "User deleted successfully", id: req.params.userId });
});

export default router;
