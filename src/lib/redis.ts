import { createClient } from "redis";
import { config } from "dotenv";

config();
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const PORT = 6379;

export const redis = createClient({
    url: `redis://:${REDIS_PASSWORD}@localhost:${PORT}`
})

redis.connect();
