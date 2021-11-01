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
import path from "path";
import connectToMongoDb from "./db-connect";
import logger from "./logger";
import { HttpError } from "./model/utility.model";
import router from "./routes";

// .env configure
config();
// Database Connected
connectToMongoDb();
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 8000;

// App created
const app: Application = express();

// Middleware:Core
app.use(cors());
app.use(express.static(path.join(__dirname, "..", "/public")));
app.use(json());
app.use(urlencoded({ extended: false }));

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

  if (error instanceof HttpError) {
    logger.error(error.message);
    return res.status(error.code).json(error.toObject());
  }
  return res
    .status(500)
    .json(new HttpError("Something went wrong.", 500).toObject());
});

app.listen(PORT, () => {
  logger.info(`The application running on http://${HOST}:${PORT}`);
});
