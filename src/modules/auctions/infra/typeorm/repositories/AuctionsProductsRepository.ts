import { Repository, getRepository } from "typeorm";

import { IAuctionsProductsRepository } from "@modules/auctions/repositories/IAuctionsProductsRepository";
import { Product } from "@modules/products/infra/typeorm/entities/Product";

import { AuctionProduct } from "../entities/AuctionProduct";

class AuctionsProductsRepository implements IAuctionsProductsRepository {
  constructor() {
    this.repository = getRepository(AuctionProduct);
  }

  private repository: Repository<AuctionProduct>;

  async listByProducts(products: Product[]): Promise<AuctionProduct[]> {
    const productsIds = products.map((product) => product.id);
    const auctionProducts = await this.repository
      .createQueryBuilder()
      .where("product_id IN (:...productsIds)", { productsIds })
      .execute();

    return auctionProducts;
  }

  async findByAuctionAndProductId(
    auction_id: string,
    product_id: string
  ): Promise<AuctionProduct> {
    const auctionProduct = await this.repository.findOne({
      auction_id,
      product_id,
    });

    return auctionProduct;
  }

  async listByAuction(auction_id: string): Promise<AuctionProduct[]> {
    const auctionProduct = await this.repository.find({
      auction_id,
    });

    return auctionProduct;
  }
}

export { AuctionsProductsRepository };
