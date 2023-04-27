import { Request, Response } from "express";
import { container } from "tsyringe";

import { BidOnAuctionProductUseCase } from "./BidOnAuctionProductUseCase";

class BidOnAuctionProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { auction_id, product_id, value } = req.body;
    const { id: user_id } = req.user;

    const bidOnAuctionProductUseCase = container.resolve(
      BidOnAuctionProductUseCase
    );

    const auction = await bidOnAuctionProductUseCase.execute({
      auction_id,
      product_id,
      user_id,
      value,
    });

    return res.status(201).json(auction);
  }
}

export { BidOnAuctionProductController };
