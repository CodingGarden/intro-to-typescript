import axios, { AxiosError, type AxiosResponse } from 'axios';

import type { ErrorResponse, Todo, TodoWithId } from '@/types';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

export type APIError = AxiosError<ErrorResponse>;

async function extractData<T>(promise: Promise<AxiosResponse<T>>) {
  const { data } = await promise;
  // eslint-disable-next-line no-promise-executor-return
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return data;
}

export async function findAll() {
  return extractData(api.get<TodoWithId[]>('/todos'));
}

export async function createOne(todo: Todo) {
  return extractData(api.post<TodoWithId>('/todos', todo));
}

export async function findOne(id: string) {
  return extractData(api.get<TodoWithId>(`/todos/${id}`));
}

export async function updateOne(id: string, todo: Todo) {
  return extractData(api.put<TodoWithId>(`/todos/${id}`, todo));
}

export async function deleteOne(id: string) {
  return extractData(api.delete(`/todos/${id}`));
}
