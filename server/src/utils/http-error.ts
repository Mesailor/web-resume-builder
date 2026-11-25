export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string = "Bad request") {
    super(400, message);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = "Resource not found") {
    super(404, message);
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string = "Internal server error") {
    super(500, message);
  }
}
