import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import CONFIG from "./app.config";

export default defineConfig({
  schema: "./src/drizzle/schema",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: CONFIG.db.pollUrl,
  },
  verbose: true,
  strict: true,
  migrations: {
    table: "__drizzle_migrations",
    schema: "public",
  },
});
