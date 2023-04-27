import { instanceToInstance } from "class-transformer";

import { AuctionProductBid } from "../infra/typeorm/entities/AuctionProductBid";

interface IResponse {
  user_id: string;
  value: number;
}

class BidOnAuctionProductMap {
  static toResponse(auctionProductBid: AuctionProductBid): IResponse {
    const auctionProductBidMapped = instanceToInstance({
      user_id: auctionProductBid.user_id,
      value: auctionProductBid.value,
    });

    return auctionProductBidMapped;
  }
}

export { BidOnAuctionProductMap };
