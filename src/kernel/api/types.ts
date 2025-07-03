interface BaseApiResponse {
  success: boolean;
  message?: string;
  statusCode: number;
}

export interface ApiSuccessResponse<T> extends BaseApiResponse {
  data: T;
  success: true;
}

export interface ApiSuccessResponsePaginated<T> extends BaseApiResponse {
  data: T[];
  pagination: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;

  };
}

export interface ApiErrorResponse extends BaseApiResponse {
  success: false;
  message: string;
}
