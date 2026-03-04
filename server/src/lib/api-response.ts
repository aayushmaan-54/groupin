interface APIResponseOptions<T> {
  statusCode?: number;
  data?: T;
  message?: string;
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Base API Response Class
export class APIResponse<T> {
  readonly statusCode: number;
  readonly success: boolean;
  readonly message: string;
  readonly data: T | null;

  constructor(options: APIResponseOptions<T>) {
    const { statusCode = 200, data = null, message = "Success" } = options;
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
  }
}

// Custom Response inheriting APIResponse Baseclass
export class Ok<T> extends APIResponse<T> {
  constructor(data?: T, message = "Success") {
    super({
      statusCode: 200,
      message,
      ...(data !== undefined ? { data } : {}),
    });
  }
}

export class Created<T> extends APIResponse<T> {
  constructor(data?: T, message = "Created successfully") {
    super({
      statusCode: 201,
      message,
      ...(data !== undefined ? { data } : {}),
    });
  }
}

export class NoContent extends APIResponse<null> {
  constructor() {
    super({
      statusCode: 204,
      message: "No content",
      data: null,
    });
  }
}

export const paginated = <T>(
  items: T[],
  pagination: PaginationMeta,
  message = "Success",
) => ({
  success: true,
  statusCode: 200,
  message,
  data: { items, pagination },
});
