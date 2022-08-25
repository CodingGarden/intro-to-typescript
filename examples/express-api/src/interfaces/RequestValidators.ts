import { AnyZodObject } from 'zod';

export default interface RequestValidators {
  params?: AnyZodObject,
  body?: AnyZodObject,
  query?: AnyZodObject,
}