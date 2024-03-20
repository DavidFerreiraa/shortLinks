import { createClient } from "redis";
import { config } from "dotenv";

//Start .env files configurations
config();

//Constants needed to create the bd connection
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const PORT = 6379;

//Connection with redis database
export const redis = createClient({
    url: `redis://:${REDIS_PASSWORD}@localhost:${PORT}`
})

//Start the connection
redis.connect();
