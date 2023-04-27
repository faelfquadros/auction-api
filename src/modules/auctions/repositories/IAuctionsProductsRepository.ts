import { Product } from "@modules/products/infra/typeorm/entities/Product";

import { AuctionProduct } from "../infra/typeorm/entities/AuctionProduct";

interface IAuctionsProductsRepository {
  listByProducts(products: Product[]): Promise<AuctionProduct[]>;
  findByAuctionAndProductId(
    auction_id: string,
    product_id: string
  ): Promise<AuctionProduct>;
  listByAuction(auction_id: string): Promise<AuctionProduct[]>;
}

export { IAuctionsProductsRepository };
