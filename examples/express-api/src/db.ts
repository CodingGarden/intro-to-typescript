import { MongoClient } from 'mongodb';

const {
  MONGO_URI = 'mongodb://localhost/todo-api',
} = process.env;

export const client = new MongoClient(MONGO_URI);
export const db = client.db();
