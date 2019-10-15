import { config } from 'dotenv';

config();
// heroku specific
const url = new URL(process.env.DATABASE_URL || `postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`);

export const PG_HOST = url.hostname;
export const PG_USERNAME = url.username;
export const PG_PASSWORD = url.password;
export const PG_PORT = Number(url.port);
export const PG_DATABASE = url.pathname.slice(1);