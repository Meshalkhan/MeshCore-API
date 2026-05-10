import axios from 'axios';

type ApiErrorBody = {
  error?: {
    message?: string;
    fields?: Record<string, string[] | undefined>;
  };
};

export function getRequestErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) return 'Request failed';
  const data = error.response?.data as ApiErrorBody | undefined;
  const msg = data?.error?.message;
  if (typeof msg === 'string' && msg.length) return msg;
  const fields = data?.error?.fields;
  if (fields && typeof fields === 'object') {
    const first = Object.values(fields).flat().find((v) => typeof v === 'string' && v.length);
    if (first) return first;
  }
  if (error.response?.status === 401) return 'Session expired or invalid credentials.';
  if (error.response?.status && error.response.status >= 500) return 'Server error. Try again shortly.';
  return error.message || 'Request failed';
}
