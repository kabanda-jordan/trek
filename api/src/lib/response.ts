export function ok<T>(data: T, message?: string) {
  return Response.json({
    success: true,
    data,
    message: message || null,
    error: null,
  });
}

export function err(message: string, status = 400) {
  return Response.json({
    success: false,
    data: null,
    message,
    error: message,
  }, { status });
}

export function safeInt(value: string | undefined | null, fallback: number, min = 0, max = 100000): number {
  if (value === undefined || value === null || value === "") return fallback;
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n)) return fallback;
  if (n < min) return min;
  if (n > max) return max;
  return n;
}

export function paginate<T>(
  content: T[],
  totalElements: number,
  currentPage: number,
  size: number,
) {
  return {
    content,
    totalElements,
    totalPages: Math.ceil(totalElements / size),
    currentPage,
    size,
  };
}
