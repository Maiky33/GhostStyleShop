export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export function apiSuccess<T>(data: T): ApiSuccessResponse<T> {
  return { success: true, data };
}

export function apiError(
  message: string,
  errors?: Record<string, string[]>,
): ApiErrorResponse {
  return { success: false, message, ...(errors ? { errors } : {}) };
}
