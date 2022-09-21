import axios, { AxiosError } from 'axios';

import type { ErrorResponse, TodoWithId } from '@/types';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

export type APIError = AxiosError<ErrorResponse>;

export async function findAll() {
  const { data } = await api.get<TodoWithId[]>('/todos');
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return data;
}

export async function createOne() {}
