import CONFIG from "@/config/app.config";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: CONFIG.db.pollUrl,
});

const directUrl = CONFIG.db.url;

export const db = drizzle(pool);
export const dbDirect = drizzle(directUrl);
