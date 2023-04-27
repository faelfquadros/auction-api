import { ICreateAuctionDTO } from "../dtos/ICreateAuctionDTO";
import { Auction } from "../infra/typeorm/entities/Auction";

interface IAuctionsRepository {
  create(data: ICreateAuctionDTO): Promise<Auction>;
  findById(id: string): Promise<Auction>;
  listActiveAuctions(): Promise<Auction[]>;
  updateFinalize(auction_id: string): Promise<void>;
}

export { IAuctionsRepository };
