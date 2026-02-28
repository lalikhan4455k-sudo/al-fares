import { createPool } from '@vercel/postgres';

// This pool will automatically use the POSTGRES_URL environment variable
const db = createPool();

export default db;
