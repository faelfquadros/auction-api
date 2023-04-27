import { inject, injectable } from "tsyringe";

import { CreateProductsMap } from "@modules/products/mapper/CreateProductsMap";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { AppError } from "@shared/errors/AppError";

import {
  IRequest,
  IResponse,
} from "../../../../@types/src/modules/products/useCases/createProduct";

@injectable()
class CreateProductUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute({
    name,
    description,
    owner_user_id,
  }: IRequest): Promise<IResponse> {
    const produtoExists = await this.productsRepository.listByName(name);

    if (produtoExists) {
      throw new AppError("This product already exists", 409);
    }

    const product = await this.productsRepository.create({
      name,
      description,
      owner_user_id,
    });

    return CreateProductsMap.toResponse(product);
  }
}

export { CreateProductUseCase };
