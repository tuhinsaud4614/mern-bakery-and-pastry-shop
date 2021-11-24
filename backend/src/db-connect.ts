import { connect } from "mongoose";
import logger from "./logger";

async function connectToMongoDb() {
  try {
    await connect(
      process.env.MONGO_DB_URI || "mongodb://localhost:27017/bakery-pastry"
    );
    logger.info(`Database connected successfully.`);
  } catch (error) {
    throw error;
  }
}

export default connectToMongoDb;
