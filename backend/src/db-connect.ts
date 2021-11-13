import { connect } from "mongoose";
import logger from "./logger";

async function connectToMongoDb() {
  try {
    await connect(
      process.env.MONGO_DB_URI || "mongodb://localhost:27017/bakery-pastry"
    );
    logger.info(`Database connected successfully.`);
  } catch (error) {
    logger.error(`Database connection failed and err is: ${error}`);
  }
}

export default connectToMongoDb;
