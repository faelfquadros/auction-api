import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import { container } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";
import { logger } from "@utils/logger";

import swaggerFile from "../../../swagger.json";
import { CronTask } from "../../cron";
import rateLimiter from "./middlewares/rateLimiter";
import { router } from "./routes";

import "@shared/container";

(async () => {
  await createConnection();
  const cronTask = container.resolve(CronTask);
  cronTask.execute();
})();

const app = express();
app.use(rateLimiter);

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());
app.use(cors());
app.use(router);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    logger.warn(error.message);
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  logger.error(error.message);
  return res.status(500).json({
    status: "error",
    message: `Internal server error: ${error}`,
  });
});

export { app };
