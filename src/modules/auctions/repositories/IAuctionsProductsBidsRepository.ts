import { ICreateAuctionProductsBidsDTO } from "../dtos/ICreateAuctionProductsBidsDTO";
import { AuctionProductBid } from "../infra/typeorm/entities/AuctionProductBid";

interface IAuctionsProductsBidsRepository {
  create(data: ICreateAuctionProductsBidsDTO): Promise<AuctionProductBid>;
  getHighest(auction_product_id: string): Promise<number>;
  getWinner(auction_product_id: string): Promise<AuctionProductBid>;
}

export { IAuctionsProductsBidsRepository };
