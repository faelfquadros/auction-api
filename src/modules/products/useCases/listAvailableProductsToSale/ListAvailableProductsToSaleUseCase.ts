import { inject, injectable } from "tsyringe";

import { ListProductsMap } from "@modules/products/mapper/ListProductsMap";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";

import {
  IRequest,
  IResponse,
} from "../../../../@types/src/modules/products/useCases/listProducts";

@injectable()
class ListAvailableProductsToSaleUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}
  async execute({
    name,
    description,
    owner_user_id,
  }: IRequest): Promise<IResponse[]> {
    const products = await this.productsRepository.listAllAvailableToSale(
      owner_user_id,
      name,
      description
    );

    return ListProductsMap.toResponse(products);
  }
}

export { ListAvailableProductsToSaleUseCase };
