import compression from "compression";
import cors from "cors";
import { config } from "dotenv";
import express, {
  Application,
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import helmet from "helmet";
import { Server } from "http";
import { MulterError } from "multer";
import path from "path";
import swagger from "swagger-ui-express";
import connectToMongoDb from "./db-connect";
import logger from "./logger";
import { HttpError } from "./model/utility.model";
import router from "./routes";
import swaggerDocument from "./swagger.json";
import { ROOT_PATH } from "./utility/constants";
import { IErrorResponse } from "./utility/interfaces";

// .env configure
config();
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8000;

// App created
const app: Application = express();

// set security HTTP headers
app.use(helmet());

// parse json & urlencoded request body
app.use(json());
app.use(urlencoded({ extended: false }));

// gzip compression
app.use(compression());

// Middleware:Core
app.use(cors());
// @ts-ignore
app.options("*", cors());

// Middleware:Static
app.use(express.static(path.join(ROOT_PATH, "/public")));

// Middleware:Swagger Docs
app.use("/api-docs", swagger.serve, swagger.setup(swaggerDocument));

// Middleware:Routes
app.use("/api/v1", router);

// Middleware:Not Found
app.use((_: Request, __: Response, next: NextFunction) => {
  const error = new HttpError("Could not find this route.", 404);
  next(error);
});

// Middleware:Error Handler
app.use((error: any, _: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    logger.warn("Header already sent.");
    return next(error);
  }

  if (error instanceof MulterError) {
    logger.error(error.message);
    return res.status(422).json({
      success: false,
      detail: null,
      message: error.message,
      error: "Unprocessable Entity",
      timeStamp: new Date(),
    } as IErrorResponse);
  }

  if (error instanceof HttpError) {
    logger.error(error.message);
    return res.status(error.code).json(error.toObject());
  }
  return res
    .status(500)
    .json(new HttpError("Something went wrong.", 500).toObject());
});

let server: Server;
// Database Connected
connectToMongoDb()
  .then(() => {
    server = app.listen(PORT, () => {
      logger.info(`The application running on http://${HOST}:${PORT}`);
    });
  })
  .catch((error) => {
    logger.error(`Database connection failed and err is: ${error}`);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed.");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});

export default app;
