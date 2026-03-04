interface APIErrorOptions {
  statusCode?: number;
  errors?: unknown[];
  stack?: string;
}

// Base API Error Class
export class APIError extends Error {
  readonly statusCode: number;
  readonly success: false = false;
  readonly isOperational: boolean = true;
  readonly errors: unknown[];

  constructor(message: string, options: APIErrorOptions = {}) {
    const { statusCode = 500, errors = [], stack } = options;
    super(message);
    this.name = "APIError";
    this.statusCode = statusCode;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Custom Errors inheriting APIError Baseclass
export class NotFound extends APIError {
  constructor(message = "Resource not found", errors?: unknown[]) {
    super(message, {
      statusCode: 404,
      ...(errors ? { errors } : {}),
    });

    this.name = "NotFoundAPIError";
  }
}

export class BadRequest extends APIError {
  constructor(message = "Bad request", errors?: unknown[]) {
    super(message, {
      statusCode: 400,
      ...(errors ? { errors } : {}),
    });
    this.name = "BadRequestAPIError";
  }
}

export class Unauthorized extends APIError {
  constructor(message = "Unauthorized") {
    super(message, { statusCode: 401 });
    this.name = "UnauthorizedAPIError";
  }
}

export class Forbidden extends APIError {
  constructor(message = "Forbidden") {
    super(message, { statusCode: 403 });
    this.name = "ForbiddenAPIError";
  }
}

export class Conflict extends APIError {
  constructor(message = "Conflict") {
    super(message, { statusCode: 409 });
    this.name = "ConflictAPIError";
  }
}

export class InternalServerError extends APIError {
  constructor(message = "Internal Server Error") {
    super(message, { statusCode: 500 });
    this.name = "InternalServerAPIError";
  }
}

export class TooManyRequests extends APIError {
  constructor(message = "Too Many Requests") {
    super(message, { statusCode: 429 });
    this.name = "TooManyRequestsAPIError";
  }
}

export class UnprocessableEntity extends APIError {
  constructor(message = "Unprocessable Entity", errors?: unknown[]) {
    super(message, {
      statusCode: 422,
      ...(errors ? { errors } : {}),
    });
    this.name = "UnprocessableEntityAPIError";
  }
}
