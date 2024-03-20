import postgres from "postgres";
import { config } from "dotenv";

//Start .env files configurations
config();

//Constants needed to create the bd connection
const POSTGRES_BD_USER = process.env.POSTGRES_BD_USER;
const POSTGRES_BD_PASSWORD = process.env.POSTGRES_BD_PASSWORD;
const PORT = 5432;

//Connection with postgres database
export const sql = postgres(`postgresql://${POSTGRES_BD_USER}:${POSTGRES_BD_PASSWORD}@localhost:${PORT}/shortlinks`);
