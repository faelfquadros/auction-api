import { Repository, getRepository } from "typeorm";

import { ICreateAuctionDTO } from "@modules/auctions/dtos/ICreateAuctionDTO";
import { IAuctionsRepository } from "@modules/auctions/repositories/IAuctionsRepository";

import { Auction } from "../entities/Auction";

class AuctionsRepository implements IAuctionsRepository {
  constructor() {
    this.repository = getRepository(Auction);
  }

  private repository: Repository<Auction>;

  async create({
    name,
    description,
    user_id,
    products,
    id,
  }: ICreateAuctionDTO): Promise<Auction> {
    const auction = this.repository.create({
      name,
      description,
      user_id,
      products,
      id,
    });

    await this.repository.save(auction);

    return auction;
  }

  async findById(id: string): Promise<Auction> {
    const auction = await this.repository.findOne({ id });

    return auction;
  }

  async listActiveAuctions(): Promise<Auction[]> {
    const auctions = await this.repository.find({
      finalized: false,
    });

    return auctions;
  }

  async updateFinalize(auction_id: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({
        finalized: true,
      })
      .where({ id: auction_id })
      .execute();
  }
}

export { AuctionsRepository };
