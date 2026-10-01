import { NextResponse } from "next/server";

import { apiError, apiSuccess } from "@/types/api";

export function jsonSuccess<T>(data: T, status = 200) {
  return NextResponse.json(apiSuccess(data), { status });
}

export function jsonError(
  message: string,
  status = 400,
  errors?: Record<string, string[]>,
) {
  return NextResponse.json(apiError(message, errors), { status });
}
