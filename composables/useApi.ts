import axios from 'axios';
import type { ProxyRequestBody } from 'types/api/proxy';
import { ref } from 'vue';

export function useApi<T = unknown>() {
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<unknown | null>(null);

  const fetchData = async (options: ProxyRequestBody) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.post<T>(API_URL, options);
      data.value = response.data;
    } catch (err) {
      error.value = err;
      console.error('API Error:', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    loading,
    error,
    fetchData,
  };
}
