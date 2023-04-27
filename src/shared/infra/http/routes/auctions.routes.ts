import { Router } from "express";

import { bidOnAuctionSchema } from "@modules/auctions/schemas/bidOnAuctionSchema";
import { createAuctionSchema } from "@modules/auctions/schemas/createAuctionSchema";
import { BidOnAuctionProductController } from "@modules/auctions/useCases/bidOnAuctionProduct/BidOnAuctionProductController";
import { CreateAuctionController } from "@modules/auctions/useCases/createAuction/CreateAuctionController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureUserType } from "../middlewares/ensureUserType";
import { validation } from "../middlewares/validation";

const auctionsRoutes = Router();

const createAuctionController = new CreateAuctionController();
auctionsRoutes.post(
  "/",
  ensureAuthenticated,
  validation(createAuctionSchema),
  createAuctionController.handle
);

const bidOnAuctionProductController = new BidOnAuctionProductController();
auctionsRoutes.post(
  "/products/bids",
  ensureAuthenticated,
  ensureUserType("buyer"),
  validation(bidOnAuctionSchema),
  bidOnAuctionProductController.handle
);

export { auctionsRoutes };
