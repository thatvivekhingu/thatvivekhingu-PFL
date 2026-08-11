import { NextResponse } from "next/server";

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
  timestamp: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: unknown;
  };
  timestamp: string;
}

export class ApiResponse {
  public static success<T>(
    data: T,
    statusCode = 200,
    meta?: Record<string, unknown>,
    headers?: Record<string, string>
  ): NextResponse<ApiSuccessResponse<T>> {
    const payload: ApiSuccessResponse<T> = {
      success: true,
      data,
      meta,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(payload, {
      status: statusCode,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        ...headers,
      },
    });
  }

  public static error(
    message: string,
    statusCode = 400,
    code?: string,
    details?: unknown,
    headers?: Record<string, string>
  ): NextResponse<ApiErrorResponse> {
    const payload: ApiErrorResponse = {
      success: false,
      error: {
        message,
        code: code || `ERR_${statusCode}`,
        details,
      },
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(payload, {
      status: statusCode,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0",
        ...headers,
      },
    });
  }
}
