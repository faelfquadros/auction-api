/* eslint-disable no-plusplus */
import { ICreateAuctionProductsBidsDTO } from "@modules/auctions/dtos/ICreateAuctionProductsBidsDTO";
import { AuctionProductBid } from "@modules/auctions/infra/typeorm/entities/AuctionProductBid";

import { IAuctionsProductsBidsRepository } from "../IAuctionsProductsBidsRepository";

class InMemoryAuctionsProductsBidsRepository
  implements IAuctionsProductsBidsRepository
{
  auctionsProductsBids: AuctionProductBid[] = [];

  async create({
    auction_product_id,
    user_id,
    value,
  }: ICreateAuctionProductsBidsDTO): Promise<AuctionProductBid> {
    const auctionProductBid = new AuctionProductBid();

    Object.assign(auctionProductBid, {
      auction_product_id,
      user_id,
      value,
    });

    this.auctionsProductsBids.push(auctionProductBid);

    return auctionProductBid;
  }

  async getHighest(auction_product_id: string): Promise<number> {
    let highestValue = 0;
    for (let i = 0; i < this.auctionsProductsBids.length; i++) {
      const actionProductBid = this.auctionsProductsBids[i];
      if (
        actionProductBid.auction_product_id === auction_product_id &&
        actionProductBid.value > highestValue
      ) {
        highestValue = actionProductBid.value;
      }
    }

    return highestValue;
  }

  async getWinner(auction_product_id: string): Promise<AuctionProductBid> {
    let highestValueProductBid: AuctionProductBid = null;
    for (let i = 0; i < this.auctionsProductsBids.length; i++) {
      const actionProductBid = this.auctionsProductsBids[i];
      if (actionProductBid.auction_product_id === auction_product_id) {
        if (
          !highestValueProductBid ||
          actionProductBid.value > highestValueProductBid.value
        ) {
          highestValueProductBid = actionProductBid;
        }
      }
    }

    return highestValueProductBid;
  }
}

export { InMemoryAuctionsProductsBidsRepository };
