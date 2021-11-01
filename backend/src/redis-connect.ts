import { createClient, RedisError } from "redis";
import logger from "./logger";

// Redis connect
const redisClient = createClient(
  process.env.REDIS_PORT ? +process.env.REDIS_PORT : 6379,
  process.env.REDIS_HOST || "localhost"
);

redisClient.on("connect", () => {
  logger.info("Redis connected successfully.");
});

redisClient.on("ready", () => {
  logger.info(`Redis is ready to use.`);
});

redisClient.on("error", (err: RedisError) => {
  logger.error(`Redis not connected. ${err.message}`);
});

redisClient.on("end", () => {
  logger.warn(`Redis is disconnected.`);
});

process.on("SIGINT", () => {
  redisClient.quit();
});

export default redisClient;
