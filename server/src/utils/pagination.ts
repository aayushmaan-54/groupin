import type { ParsedQs } from "qs";

interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const extractString = (value: ParsedQs[string]): string | undefined => {
  if (Array.isArray(value)) {
    const first = value[0];
    return typeof first === "string" ? first : undefined;
  }
  return typeof value === "string" ? value : undefined;
};

const parsePositiveInt = (
  raw: string | undefined,
  fallback: number,
  max?: number,
): number => {
  const parsed = Number.parseInt(raw ?? "", 10);
  const safe = Number.isNaN(parsed) ? fallback : Math.max(1, parsed);
  return max !== undefined ? Math.min(max, safe) : safe;
};

export const parsePagination = (query: ParsedQs): PaginationParams => {
  const page = parsePositiveInt(extractString(query["page"]), 1);
  const limit = parsePositiveInt(extractString(query["limit"]), 10, 100);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

export const buildPagination = (
  page: number,
  limit: number,
  total: number,
): PaginationMeta => ({
  page,
  limit,
  total,
  totalPages: Math.ceil(total / limit),
  hasNext: page * limit < total,
  hasPrev: page > 1,
});
