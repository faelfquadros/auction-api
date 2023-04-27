import { instanceToInstance } from "class-transformer";

import { IResponse } from "../../../@types/src/modules/products/useCases/createProduct";
import { Product } from "../infra/typeorm/entities/Product";

class CreateProductsMap {
  static toResponse(product: Product): IResponse {
    const productMapped = instanceToInstance({
      id: product.id,
      name: product.name,
      description: product.description,
      owner_user_id: product.owner_user_id,
    });

    return productMapped;
  }
}

export { CreateProductsMap };
