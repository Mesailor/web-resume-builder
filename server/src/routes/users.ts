import express from "express";
import * as z from "zod";
import { MongoServerError } from "mongodb";
import { db } from "../prisma/db.ts";
import { isValidObjectId } from "../utils/index.ts";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../utils/http-error.ts";
import { UserCreateSchema, UserUpdateSchema } from "../schemas/users.ts";

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
  const parsed = UserCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new BadRequestError(z.prettifyError(parsed.error));
  }

  try {
    const newUser = await db.orm.users.create(parsed.data);
    res.send(newUser);
  } catch (err) {
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new ConflictError("User already exists");
    }
    throw err;
  }
});

router.patch("/:userId", async (req, res) => {
  const isValidId = isValidObjectId(req.params.userId);
  if (!isValidId) {
    throw new BadRequestError("Invalid user ID");
  }

  const parsed = UserUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new BadRequestError(z.prettifyError(parsed.error));
  }

  try {
    const updatedUser = await db.orm.users
      .where({ id: req.params.userId })
      .update(parsed.data);
    if (!updatedUser) {
      throw new NotFoundError("User not found");
    }
    res.send(updatedUser);
  } catch (err) {
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new ConflictError("User already exists");
    }
    throw err;
  }
});

router.delete("/:userId", async (req, res) => {
  const isValidId = isValidObjectId(req.params.userId);
  if (!isValidId) {
    throw new BadRequestError("Invalid user ID");
  }

  const deletedUser = await db.orm.users
    .where({ id: req.params.userId })
    .delete();
  if (!deletedUser) {
    throw new NotFoundError("User not found");
  }

  res.send({ message: "User deleted successfully", id: req.params.userId });
});

export default router;
