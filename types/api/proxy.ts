export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export interface ProxyRequestBody {
  endpoint: string;
  method?: HttpMethod;
  query?: Record<string, string | number | boolean | null | undefined>;
  params?: Record<string, unknown>;
}
