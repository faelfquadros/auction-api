import { ICreateAuctionDTO } from "@modules/auctions/dtos/ICreateAuctionDTO";
import { Auction } from "@modules/auctions/infra/typeorm/entities/Auction";
import { AuctionProduct } from "@modules/auctions/infra/typeorm/entities/AuctionProduct";

import { IAuctionsRepository } from "../IAuctionsRepository";

class InMemoryAuctionsRepository implements IAuctionsRepository {
  auctions: Auction[] = [];
  auctionsProducts: AuctionProduct[] = [];

  async create({
    name,
    description,
    user_id,
    products,
  }: ICreateAuctionDTO): Promise<Auction> {
    const auction = new Auction();

    Object.assign(auction, {
      name,
      description,
      user_id,
      products,
    });

    this.auctions.push(auction);

    return auction;
  }

  async findById(id: string): Promise<Auction> {
    const auction = this.auctions.find((a) => a.id === id);

    return auction;
  }

  async listActiveAuctions(): Promise<Auction[]> {
    const auctions = this.auctions.filter((a) => a.finalized);

    return auctions;
  }

  async updateFinalize(auction_id: string): Promise<void> {
    const auctionIndex = this.auctions.findIndex(
      (auction) => auction.id === auction_id
    );

    if (auctionIndex !== -1) {
      this.auctions[auctionIndex].finalized = true;
    }
  }
}

export { InMemoryAuctionsRepository };
