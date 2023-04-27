import { Router } from "express";

import { createProductSchema } from "@modules/products/schemas/createProductSchema";
import { CreateProductController } from "@modules/products/useCases/createProduct/CreateProductController";
import { ListAvailableProductsController } from "@modules/products/useCases/listAvailableProductsToSale/ListAvailableProductsToSaleController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureUserType } from "../middlewares/ensureUserType";
import { validation } from "../middlewares/validation";

const productsRoutes = Router();

const createProductController = new CreateProductController();
productsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureUserType("seller"),
  validation(createProductSchema),
  createProductController.handle
);

const listAvailableProductsController = new ListAvailableProductsController();
productsRoutes.get(
  "/available-to-sale",
  ensureAuthenticated,
  listAvailableProductsController.handle
);

export { productsRoutes };
