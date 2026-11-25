import type { ErrorRequestHandler } from "express";
import { HttpError } from "../utils/http-error.ts";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err); // log the real error on the server

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err.status === 400) {
    return res.status(400).json({ message: err.message || "Bad request" });
  }

  res.status(500).json({ message: "Server error occurred" });
};
