import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://placeholder:placeholder@ep-placeholder.us-east-2.aws.neon.tech/neondb?sslmode=require";
const sql = neon(connectionString);
export const db = drizzle({ client: sql });
