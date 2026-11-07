import axios from 'axios';

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/+$/, '') ?? '';

/**
 * In Vite dev, leave the base empty so `/api/*` is proxied to the configured API host.
 * Built bundles call that host directly.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.DEV ? '' : configuredBaseUrl,
});

export function getApiBaseUrl() {
  return configuredBaseUrl || 'http://localhost:5128';
}
