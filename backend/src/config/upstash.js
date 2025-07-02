import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from '@upstash/redis'
import dotenv from "dotenv"

dotenv.config()
const redis = Redis.fromEnv()

// await redis.set("foo", "bar");
// await redis.get("foo");

// Create a new ratelimiter, that allows 100 requests per 60 seconds
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

export default ratelimit