import { Client } from 'pg';

export const getConection = async () => {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'ciro',
    password: '13443',
    database: 'my_store',
  });
  await client.connect();
  return client;
}




