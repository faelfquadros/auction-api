import { Router } from "express";

import { authenticateUserSchema } from "@modules/accounts/schemas/authenticateUserSchema";
import { refreshTokenSchema } from "@modules/accounts/schemas/refreshTokenSchema";
import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

import { validation } from "../middlewares/validation";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
authenticateRoutes.post(
  "/sessions",
  validation(authenticateUserSchema),
  authenticateUserController.handle
);

const refreshTokenController = new RefreshTokenController();
authenticateRoutes.post(
  "/refresh-token",
  validation(refreshTokenSchema),
  refreshTokenController.handle
);

export { authenticateRoutes };
