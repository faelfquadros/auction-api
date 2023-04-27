import { AuctionProduct } from "@modules/auctions/infra/typeorm/entities/AuctionProduct";
import { Product } from "@modules/products/infra/typeorm/entities/Product";

import { IAuctionsProductsRepository } from "../IAuctionsProductsRepository";

class InMemoryAuctionsProductsRepository
  implements IAuctionsProductsRepository
{
  auctionsProducts: AuctionProduct[] = [];

  async create(auction_id: string, products: string[]): Promise<void> {
    Promise.all(
      products.map((product) => {
        const auctionProduct = new AuctionProduct();

        Object.assign(auctionProduct, {
          auction_id,
          product_id: product,
        });

        return this.auctionsProducts.push(auctionProduct);
      })
    );
  }

  async listByProducts(products: Product[]): Promise<AuctionProduct[]> {
    const productsIds = products.map((product) => product.id);
    const auctionProducts = this.auctionsProducts.filter((ap) =>
      productsIds.includes(ap.auction_id)
    );

    return auctionProducts;
  }

  async findByAuctionAndProductId(
    auction_id: string,
    product_id: string
  ): Promise<AuctionProduct> {
    const auctionProduct = this.auctionsProducts.find(
      (ap) => ap.auction_id === auction_id && ap.product_id === product_id
    );

    return auctionProduct;
  }

  async listByAuction(auction_id: string): Promise<AuctionProduct[]> {
    const auctionProduct = this.auctionsProducts.filter(
      (ap) => ap.auction_id === auction_id
    );

    return auctionProduct;
  }
}

export { InMemoryAuctionsProductsRepository };
