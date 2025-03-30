export function usePagination<TResponse>(
  options: PaginationOptions<TResponse>
) {
  const { data, loading, error, fetchData } = useApi<TResponse>();

  const fetch = async () => {
    await fetchData({
      endpoint: options.endpoint,
      method: options.method,
      query: options.getQueryParams(),
    });

    if (data.value) {
      options.onSuccess?.(data.value);
    }
  };

  watch(options.watchSources, fetch, { immediate: options.immediate ?? true });

  return {
    result: data,
    loading,
    error,
    fetch,
  };
}
