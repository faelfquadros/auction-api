/* eslint-disable @typescript-eslint/no-explicit-any */
import { Repository, getRepository } from "typeorm";

import { ICreateAuctionProductsBidsDTO } from "@modules/auctions/dtos/ICreateAuctionProductsBidsDTO";
import { IAuctionsProductsBidsRepository } from "@modules/auctions/repositories/IAuctionsProductsBidsRepository";

import { AuctionProductBid } from "../entities/AuctionProductBid";

class AuctionsProductsBidsRepository
  implements IAuctionsProductsBidsRepository
{
  constructor() {
    this.repository = getRepository(AuctionProductBid);
  }

  private repository: Repository<AuctionProductBid>;

  async create({
    auction_product_id,
    user_id,
    value,
  }: ICreateAuctionProductsBidsDTO): Promise<AuctionProductBid> {
    const auctionProductBid = this.repository.create({
      auction_product_id,
      user_id,
      value,
    });

    await this.repository.save(auctionProductBid);

    return auctionProductBid;
  }

  async getHighest(auction_product_id: string): Promise<number> {
    const result: any = await this.repository
      .createQueryBuilder("apb")
      .select("MAX(apb.value)", "max_value")
      .where({ auction_product_id })
      .getRawOne();

    return result?.max_value || 0;
  }

  async getWinner(auction_product_id: string): Promise<AuctionProductBid> {
    const result = await this.repository
      .createQueryBuilder("apb")
      .select("apb.user_id, apb.value")
      .where({ auction_product_id })
      .orderBy("apb.value", "DESC")
      .limit(1)
      .execute();

    return result.shift();
  }
}

export { AuctionsProductsBidsRepository };
