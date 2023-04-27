import { inject, injectable } from "tsyringe";

import { CreateAuctionMap } from "@modules/auctions/mapper/CreateAuctionMap";
import { IAuctionsRepository } from "@modules/auctions/repositories/IAuctionsRepository";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { AppError } from "@shared/errors/AppError";

import {
  IRequest,
  IResponse,
} from "../../../../@types/src/modules/auctions/useCases/createAuction";

@injectable()
class CreateAuctionUseCase {
  constructor(
    @inject("AuctionsRepository")
    private auctionsRepository: IAuctionsRepository,
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute({
    name,
    description,
    user_id,
    products,
  }: IRequest): Promise<IResponse> {
    const productsList = await this.productsRepository.listByProducts(
      user_id,
      products
    );

    if (productsList.length !== products.length) {
      throw new AppError(
        "Even the user or some of the products are invalid to create this auction",
        400
      );
    }

    const productsAvailableToSale =
      await this.productsRepository.listByAvailableProducts(user_id, products);

    if (productsAvailableToSale.length !== products.length) {
      throw new AppError("Some of the products are already in an auction", 400);
    }

    const auction = await this.auctionsRepository.create({
      name,
      description,
      user_id,
      products: productsList,
    });

    await this.productsRepository.updateAvailableToSale(false, products);

    return CreateAuctionMap.toResponse(auction);
  }
}

export { CreateAuctionUseCase };
