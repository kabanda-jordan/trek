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
