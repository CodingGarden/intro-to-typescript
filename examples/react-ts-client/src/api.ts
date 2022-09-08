import axios, { AxiosError, AxiosResponse } from 'axios';

import { Todo, TodoWithId, ErrorResponse } from '@/types';

const client = axios.create({
  baseURL: 'http://localhost:5000/api/v1/todos',
});

export type APIError = AxiosError<ErrorResponse>;

async function extractData<T>(promise: Promise<AxiosResponse<T>>) {
  const { data } = await promise;
  // eslint-disable-next-line no-promise-executor-return
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return data;
}

export async function findAll() {
  return extractData(client.get<TodoWithId[]>('/'));
}

export async function createOne(todo: Todo) {
  return extractData(client.post<TodoWithId>('/', todo));
}

export async function findOne(id: string) {
  return extractData(client.get<TodoWithId>(`/${id}`));
}

export async function updateOne(id: string, todo: Todo) {
  return extractData(client.put<TodoWithId>(`/${id}`, todo));
}

export async function deleteOne(id: string) {
  return extractData(client.delete(`/${id}`));
}
