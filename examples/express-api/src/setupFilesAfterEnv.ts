import { client } from './db';

global.afterAll(async () => {
  await client.close();
});
