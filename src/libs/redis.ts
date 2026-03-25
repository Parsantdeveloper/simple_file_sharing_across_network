import Redis from "ioredis";
import { env } from "../config/env";

const redis = new Redis(env.UPSTASH_REDIS_URL, {
  maxRetriesPerRequest: 2,
  enableReadyCheck: true,
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
});

export default redis;