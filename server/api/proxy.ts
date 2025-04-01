import { useRuntimeConfig } from '#imports';
import axios from 'axios';
import { readBody } from 'h3';
import type { ProxyRequestBody } from '../../types/api/proxy';

export default defineEventHandler(async event => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const {
    endpoint,
    method = 'get',
    query = {},
    params = {},
  } = body as ProxyRequestBody;

  const response = await axios.request({
    baseURL: config.public.apiBaseUrl,
    url: endpoint,
    method,
    params: query,
    data: method !== 'get' ? params : undefined,
  });

  return response.data;
});
