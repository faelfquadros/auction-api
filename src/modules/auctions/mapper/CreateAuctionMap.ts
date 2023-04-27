import { instanceToInstance } from "class-transformer";

import {
  IProducts,
  IResponse,
} from "../../../@types/src/modules/auctions/useCases/createAuction";
import { Auction } from "../infra/typeorm/entities/Auction";

class CreateAuctionMap {
  static async toResponse(auction: Auction): Promise<IResponse> {
    const auctionMapped = instanceToInstance({
      id: auction.id,
      name: auction.name,
      description: auction.description,
      user_id: auction.user_id,
      products: [],
    });

    const productsMapped: IProducts[] = await Promise.all(
      auction.products.map((product) => {
        const productMapped = instanceToInstance({
          id: product.id,
          name: product.name,
          description: product.description,
          owner_user_id: product.owner_user_id,
        });
        return productMapped as IProducts;
      })
    );

    auctionMapped.products = productsMapped;

    return auctionMapped as IResponse;
  }
}

export { CreateAuctionMap };
