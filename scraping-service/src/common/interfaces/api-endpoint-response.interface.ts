export interface ApiEndpointResponse {
  data?: unknown;
  error?: string;
  message?: string | string[];
  statusCode?: number;
}
