import Router from "express";

import { auctionsRoutes } from "./auctions.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { productsRoutes } from "./products.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use(authenticateRoutes);
router.use("/users", usersRoutes);
router.use("/products", productsRoutes);
router.use("/auctions", auctionsRoutes);

export { router };
