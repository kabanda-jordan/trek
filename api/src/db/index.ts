import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb(databaseUrl: string) {
  if (!_db) {
    const sql = neon(databaseUrl);
    _db = drizzle(sql, { schema });
  }
  return _db;
}
