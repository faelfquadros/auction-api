import { inject, injectable } from "tsyringe";

import { BidOnAuctionProductMap } from "@modules/auctions/mapper/BidOnAuctionProductMap";
import { IAuctionsProductsBidsRepository } from "@modules/auctions/repositories/IAuctionsProductsBidsRepository";
import { IAuctionsProductsRepository } from "@modules/auctions/repositories/IAuctionsProductsRepository";
import { IAuctionsRepository } from "@modules/auctions/repositories/IAuctionsRepository";
import { AppError } from "@shared/errors/AppError";

import {
  IRequest,
  IResponse,
} from "../../../../@types/src/modules/auctions/useCases/bidOnAuctionProduct";

@injectable()
class BidOnAuctionProductUseCase {
  constructor(
    @inject("AuctionsRepository")
    private auctionsRepository: IAuctionsRepository,
    @inject("AuctionsProductsRepository")
    private auctionsProductsRepository: IAuctionsProductsRepository,
    @inject("AuctionsProductsBidsRepository")
    private auctionsProductsBidsRepository: IAuctionsProductsBidsRepository
  ) {}

  async execute({
    auction_id,
    product_id,
    user_id,
    value,
  }: IRequest): Promise<IResponse> {
    const auctionProduct =
      await this.auctionsProductsRepository.findByAuctionAndProductId(
        auction_id,
        product_id
      );

    if (!auctionProduct) {
      throw new AppError("Auction or product are invalid", 400);
    }

    const auction = await this.auctionsRepository.findById(auction_id);

    if (auction.finalized) {
      throw new AppError("This auction has already finished", 410);
    }

    const lastHighestBid = await this.auctionsProductsBidsRepository.getHighest(
      auctionProduct.id
    );

    if (value <= lastHighestBid) {
      throw new AppError(
        `The bid needs to be above the last highest bid, which is ${value}`,
        400
      );
    }

    const auctionProductBid = await this.auctionsProductsBidsRepository.create({
      auction_product_id: auctionProduct.id,
      user_id,
      value,
    });

    return BidOnAuctionProductMap.toResponse(auctionProductBid);
  }
}

export { BidOnAuctionProductUseCase };
