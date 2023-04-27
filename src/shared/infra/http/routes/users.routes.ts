import { Router } from "express";

import { createUserSchema } from "@modules/accounts/schemas/createUserSchema";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";

import { validation } from "../middlewares/validation";

const usersRoutes = Router();

const createUserController = new CreateUserController();
usersRoutes.post(
  "/",
  validation(createUserSchema),
  createUserController.handle
);

export { usersRoutes };
