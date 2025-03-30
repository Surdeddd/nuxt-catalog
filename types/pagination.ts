import type { HttpMethod } from 'types/api/proxy';
import type { WatchSource } from 'vue';

export interface PaginationOptions<TResponse> {
  endpoint: string;
  method: HttpMethod;
  getQueryParams: () => Record<
    string,
    string | number | boolean | null | undefined
  >;
  watchSources: WatchSource[];
  immediate?: boolean;
  onSuccess?: (data: TResponse) => void;
}
