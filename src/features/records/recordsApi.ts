import { apiClient, getApiBaseUrl } from '../../api/httpClient';
import type { TestRecord } from './types';

function isTestRecord(value: unknown): value is TestRecord {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const record = value as Record<string, unknown>;
  return typeof record.id === 'number'
    && typeof record.column1 === 'string'
    && typeof record.column2 === 'number'
    && typeof record.column3 === 'number'
    && typeof record.column4 === 'string';
}

export async function fetchTestRecords(signal?: AbortSignal): Promise<TestRecord[]> {
  const response = await apiClient.get<unknown>('/api/test', { signal });
  if (!Array.isArray(response.data) || !response.data.every(isTestRecord)) {
    throw new Error(`Expected an array of test records from ${getApiBaseUrl()}/api/test.`);
  }

  return response.data;
}
