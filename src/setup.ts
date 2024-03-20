import { sql } from "./lib/postgres";

async function setup() {
    //SQL code to create shortlinks table into postgres bd 
    await sql/*sql*/`
    CREATE TABLE IF NOT EXISTS short_links (
        id SERIAL PRIMARY KEY,
        code TEXT UNIQUE,
        original_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `
    //Wait until the end of the execution
    await sql.end()
    console.log("Setup successful")
}

setup();